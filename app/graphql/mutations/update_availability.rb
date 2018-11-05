class Mutations::UpdateAvailability < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :availability, [String], required: true, description: "The clients availability. Should be an array of ISO strings"

  field :user, Types::User, null: true

  def resolve(**args)
    user = ::User.find_by_airtable_id(args[:id])
    user.update_attributes(availability: args[:availability])

    return { user: user }
  end
end
