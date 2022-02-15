# frozen_string_literal: true

module Toby
  module Lookups
    module Applications
      class SpecialistName < Attributes::String
        include Lookup

        filter "contains...", Filters::StringContains do |records, _attribute, value|
          if value.any? && value.first.present?
            query = records.joins(application: {specialist: :account})
            names = value.first.split
            names.each do |name|
              query = query.where("accounts.first_name ILIKE ?", "%#{name}%").
                or(query.where("accounts.last_name ILIKE ?", "%#{name}%"))
            end
            query.distinct
          else
            records
          end
        end

        def lazy_read_class
          Toby::Lazy::Single
        end

        def includes
          {specialist: :account}
        end

        def via
          :application_id
        end

        def lazy_model
          Application
        end

        def lazy_read(application)
          application&.specialist&.account&.name
        end
      end
    end
  end
end