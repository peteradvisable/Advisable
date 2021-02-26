# frozen_string_literal: true

module Toby
  module Types
    module AttributeInterface
      include GraphQL::Schema::Interface

      orphans = []
      (Toby::Attributes.constants - [:BaseAttribute]).each do |klass|
        orphans << "Toby::Attributes::#{klass}".constantize.attribute_type
      end
      orphan_types(*orphans)

      field :name, GraphQL::Types::String, null: false
      def name
        object.name.to_s.camelize(:lower)
      end

      field :filters, [Toby::Types::ResourceFilterType], null: false

      def filters
        object.class.filters.map do |k, v|
          {name: k, type: v.name.demodulize}
        end
      end

      field :readonly, GraphQL::Types::Boolean, null: false
      def readonly
        object.options[:readonly] || false
      end

      definition_methods do
        def resolve_type(object, _)
          object.class.attribute_type
        end
      end
    end
  end
end
