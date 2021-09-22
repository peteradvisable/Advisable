# frozen_string_literal: true

module Types
  class GuildPostMessage < Types::BaseType
    implements Types::MessageInterface

    graphql_name "GuildPostMessage"
    description "Type for the Message model when it has a guild post."

    field :post, Types::Guild::Post::PostType, null: false

    field :calendly_url, String, null: true
    def calendly_url
      object.metadata["calendly_url"]
    end
  end
end