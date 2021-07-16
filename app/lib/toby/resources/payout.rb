# frozen_string_literal: true

module Toby
  module Resources
    class Payout < BaseResource
      model_name ::Payout
      attribute :uid, Attributes::String, readonly: true
      attribute :specialist, Attributes::BelongsTo
      attribute :amount, Attributes::Currency
      attribute :sourcing_fee, Attributes::Currency
      attribute :status, Attributes::String
      attribute :processed_at, Attributes::DateTime, readonly: true
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      action :process

      def self.process(object)
        return if object.processed_at?

        object.update(processed_at: Time.zone.now)
      end
    end
  end
end
