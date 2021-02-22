# frozen_string_literal: true

module Guild
  class Event < ApplicationRecord
    include ResizedImage

    acts_as_ordered_taggable_on :guild_topics

    has_many :event_attendees, class_name: 'Guild::EventAttendee', foreign_key: 'guild_event_id', inverse_of: :guild_event, dependent: :destroy
    has_many :attendees, through: :event_attendees
    belongs_to :host, class_name: 'Specialist'

    has_one_attached :cover_photo
    resize cover_photo: {resize_to_limit: [1600, 1600]}

    validates :starts_at, :ends_at, :title, :description, presence: true
    validates :title, length: {maximum: 250, minimum: 8}
    validates :description, length: {maximum: 10_000, minimum: 16}
    validate :end_is_after_start

    scope :published, -> { where(published: true) }

    scope :upcoming, lambda {
      published.where("starts_at >= ?", Time.current).order(starts_at: :asc)
    }

    protected

    def end_is_after_start
      errors.add(:ends_at, "must be after starts_at") if starts_at >= ends_at
    end
  end
end

# == Schema Information
#
# Table name: guild_events
#
#  id              :uuid             not null, primary key
#  attendees_count :integer          default(0)
#  description     :text             not null
#  ends_at         :datetime
#  published       :boolean          default(FALSE)
#  starts_at       :datetime
#  title           :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  host_id         :bigint
#
# Indexes
#
#  index_guild_events_on_host_id  (host_id)
#
# Foreign Keys
#
#  fk_rails_...  (host_id => specialists.id)
#
