# frozen_string_literal: true

class Mutations::ApproveTask < Mutations::BaseMutation
  argument :task, ID, required: true

  field :task, Types::TaskType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    task = Task.find_by_uid!(args[:task])
    policy = TaskPolicy.new(context[:current_user], task)
    return true if policy.via_client?

    [false, {errors: [{code: "not_authorized"}]}]
  end

  def resolve(**args)
    task = Task.find_by_uid!(args[:task])

    {task: Tasks::Approve.call(task: task, responsible_id: current_account_id)}

  rescue Service::Error => e
    {errors: [e]}
  end
end
