class Types::Guild::PostType < Types::BaseType
  include ActionView::Helpers::DateHelper

  field :id, ID, null: false do
    description 'The unique ID for the guild post'
  end

  field :title, String, null: true do
    description 'The title of the guild post'
  end

  field :body, String, null: true do
    description 'The body of the guild post'
  end

  field :body_raw, String, null: true do
    description 'The serialized draftjs body of the guild post'
  end

  field :status, String, null: true do
    description 'The status of the guild post'
  end

  field :comments_count, Integer, null: false do
    description 'The total count of comments for a guild post'
  end

  field :reactions_count, Integer, null: false do
    description 'The total count of reactions for a guild post'
  end
  def reactions_count
    object.reactionable_count
  end

  field :reacted, Boolean, null: false do
    description 'Whether the current user has reacted to the guild post'
  end
  def reacted
    object.reactions.exists?(specialist: context[:current_user])
  end

  field :type, String, null: false do
    description 'The guild post type'
  end
  def type
    object.normalized_type
  end

  field :authored, Boolean, null: false do
    description 'Whether the current user is the guild post author'
  end
  def authored
    object.specialist_id == context[:current_user]&.id
  end

  field :commented, Boolean, null: false do
    description 'Whether the current user has commented on the guild post'
  end
  def commented
    object.comments.exists?(specialist: context[:current_user])
  end

  field :author, Types::SpecialistType, null: false do
    description "The author of the guild post"
  end
  def author
    object.specialist
  end

  field :created_at, GraphQL::Types::ISO8601DateTime, null: true do
    # authorize :is_admin
    description 'The timestamp for when the guild post record was created'
  end

  field :updated_at, GraphQL::Types::ISO8601DateTime, null: true do
    # authorize :is_admin
    description 'The timestamp for when the guild post record was last updated'
  end

  field :created_at_time_ago, String, null: true do
    description 'The timestamp in words for when the guild post was created'
  end
  def created_at_time_ago
    time_ago_in_words(object.created_at)
  end
end
