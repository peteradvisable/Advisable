# frozen_string_literal: true

class PostInterviewJob < ApplicationJob
  def perform
    Interview.scheduled.where(starts_at: (30.minutes.ago..Time.current)).each do |interview|
      interview.update(status: "Call Completed")
      SpecialistMailer.post_interview(interview).deliver_later
      UserMailer.post_interview(interview).deliver_later
      PostInterviewReminderJob.set(wait_until: interview.starts_at + 1.day).perform_later(interview)
    end
  end
end
