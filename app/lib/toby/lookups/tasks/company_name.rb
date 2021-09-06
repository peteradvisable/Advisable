# frozen_string_literal: true

module Toby
  module Lookups
    module Tasks
      class CompanyName < Attributes::String
        def self.lookup?
          true
        end

        def readonly
          true
        end

        def lazy_read_class
          Toby::Lazy::Single
        end

        def includes
          {project: {user: :company}}
        end

        def via
          :application_id
        end

        def lazy_model
          Application
        end

        def lazy_read(application)
          application&.project&.user&.company&.name
        end
      end
    end
  end
end
