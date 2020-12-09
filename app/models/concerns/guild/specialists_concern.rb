module Guild::SpecialistsConcern
  extend ActiveSupport::Concern

  included do
    acts_as_tagger

    # specialist.follow(Guild::Topic.last)
    # specialist.follows.where(followable_type: 'ActsAsTaggableOn::Tag')
    acts_as_follower

    has_many :guild_posts, class_name: 'Guild::Post', dependent: :destroy, inverse_of: :specialist
    has_many :guild_comments, class_name: 'Guild::Comment', dependent: :destroy
    has_many :guild_post_comments,
             -> { published.order(created_at: :desc) },
             through: :guild_posts, source: :comments
    has_many :guild_post_reactions,
             -> { order(created_at: :desc) },
             through: :guild_posts,
             source: :reactions,
             class_name: 'Guild::Reaction'

      has_many :guild_topics_follows, through: :follows, source: :followable, source_type: "ActsAsTaggableOn::Tag"

      before_save :guild_joined_callbacks, if: -> { guild_changed? && guild }

    scope :guild, -> { where(guild: true) }
    scope :guild_featured_members, lambda {
                                     guild.
                                       where("guild_data->'guild_featured_member_at' IS NOT NULL").
                                       guild_data_order(guild_featured_member_at: :desc)
                                   }
    jsonb_accessor :guild_data,
                   guild_joined_date: :datetime,
                   guild_notifications_last_read: [:datetime, {default: Time.zone.at(0)}],
                   guild_calendly_link: [:string],
                   guild_featured_member_at: :datetime

    def touch_guild_notifications_last_read
      update!(guild_notifications_last_read: Time.current)
    end

    def guild_unread_notifications
      return false unless guild_activity.any?

      guild_activity.first.created_at > guild_notifications_last_read
    end

    def guild_activity
      @guild_activity ||= [
        guild_post_comments.limit(10),
        guild_post_reactions.limit(10)
      ].flatten.sort { |a, b| b.created_at <=> a.created_at }

      #  Something more scalable post launch but limited in the graph
      #    returns [{context:, post_id:, created_at, specialist_id:}, ...]
      #
      # sql = ActiveRecord::Base.connection.unprepared_statement {
      #   "(
      #     (#{guild_post_comments.joins(:specialist).select(
      #       "guild_comments.body as context,
      #       'Guild::Comment' as type,
      #       guild_comments.guild_post_id as post_id,
      #       guild_comments.created_at,
      #       specialists.id as specialist_id"
      #     ).to_sql})
      #       UNION ALL
      #     (#{guild_post_reactions.joins(:specialist).select(
      #       "'gave thanks' as context,
      #       'Guild::Reaction' as type,
      #       guild_reactions.reactionable_id as post_id,
      #       guild_reactions.created_at,
      #       specialists.id as specialist_id"
      #     ).to_sql})
      #     ORDER BY created_at DESC
      #     LIMIT 20
      #   )"
      # }
      # ActiveRecord::Base.connection.execute(sql)
    end

    protected

    def guild_joined_callbacks
      self.guild_joined_date ||= Time.current
      GuildAddFollowablesJob.perform_later(id)
    end
  end
end
