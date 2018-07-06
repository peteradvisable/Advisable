class Types::Booking < Types::BaseType
  field :id, ID, null: false
  field :type, String, null: true
  field :rate, String, null: true
  field :rate_type, String, null: true
  field :rate_limit, String, null: true
  field :status, String, null: true
  field :duration, String, null: true
  field :deliverables, [String], null: true
  field :application, Types::ApplicationType, null: false
end
