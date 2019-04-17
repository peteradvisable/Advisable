class Tasks::Submit < ApplicationService
  attr_reader :task

  def initialize(task:)
    @task = task
  end

  def call
    if task.update_attributes(stage: "Submitted")
      task.sync_to_airtable
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end
end