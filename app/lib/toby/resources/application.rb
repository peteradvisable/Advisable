# frozen_string_literal: true

module Toby
  module Resources
    class Application < BaseResource
      model_name ::Application
      attribute :uid, Attributes::String
      attribute :status, Attributes::Select, options: ["Applied"] + ::Application::ACTIVE_STATUSES
      attribute :specialist, Attributes::BelongsTo, labeled_by: :account
      attribute :project, Attributes::BelongsTo, labeled_by: :name
      attribute :introduction, Attributes::String
      attribute :score, Attributes::Integer
    end
  end
end
