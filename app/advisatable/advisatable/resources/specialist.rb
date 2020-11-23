module Advisatable
  module Resources
    class Specialist < BaseResource
      set_model ::Specialist
      column :account, Advisatable::Columns::BelongsTo, resource: Advisatable::Resources::Account, labelled_by: :name
      column :linkedin, Advisatable::Columns::String
    end
  end
end
