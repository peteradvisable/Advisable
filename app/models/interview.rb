# frozen_string_literal: true

require "icalendar/tzinfo"

class Interview < ApplicationRecord
  include Uid

  has_logidze

  VALID_STATUSES = [
    "Call Scheduled", "Call Completed", "Call Requested", "Need More Time Options",
    "More Time Options Added", "Specialist Requested Reschedule", "Client Requested Reschedule"
  ].freeze

  belongs_to :application
  belongs_to :user # An interview is scheduled with a specific user (client contact)
  has_one :specialist, through: :application
  has_one :video_call, dependent: :destroy

  scope :scheduled, -> { where(status: "Call Scheduled") }

  validates :status, inclusion: {in: VALID_STATUSES}

  def calendar_event_with(summary, description)
    cal = Icalendar::Calendar.new
    cal.add_timezone(starts_at.time_zone.tzinfo.ical_timezone(starts_at))
    cal.event do |e|
      e.dtstart = starts_at
      e.dtend = starts_at + 30.minutes
      e.summary = summary
      e.description = description
      e.location = "#{ApplicationMailer.default_url_options[:host]}/calls/#{video_call.uid}"
      e.organizer = user.company.sales_person.cal_address
      e.ip_class = "PRIVATE"
    end
    cal.publish
    cal
  end
end

# == Schema Information
#
# Table name: interviews
#
#  id                                 :bigint           not null, primary key
#  availability_note                  :string
#  call_requested_at                  :datetime
#  call_scheduled_at                  :datetime
#  client_requested_reschedule_at     :datetime
#  more_time_options_added_at         :datetime
#  requested_more_time_options_at     :datetime
#  specialist_requested_reschedule_at :datetime
#  starts_at                          :datetime
#  status                             :string
#  time_zone                          :string
#  uid                                :string           not null
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#  application_id                     :bigint
#  user_id                            :bigint
#  zoom_meeting_id                    :string
#
# Indexes
#
#  index_interviews_on_application_id  (application_id)
#  index_interviews_on_uid             (uid) UNIQUE
#  index_interviews_on_user_id         (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (application_id => applications.id)
#  fk_rails_...  (user_id => users.id)
#
