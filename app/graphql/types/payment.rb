# frozen_string_literal: true

module Types
  class Payment < Types::BaseType
    description "Type for Payment model"

    field :id, ID, null: false, method: :uid
    field :status, String, null: true
    field :amount, Int, null: false
    field :admin_fee, Int, null: false
    field :payment_intent_id, ID, null: false
    field :company, CompanyType, null: false
    field :specialist, SpecialistType, null: false
    field :task, TaskType, null: true
  end
end
