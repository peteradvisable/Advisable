class Types::SpecialistType < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :first_name, String, null: true
  field :last_name, String, null: true
  field :name, String, null: true
  field :city, String, null: true
  field :bio, String, null: true
  field :country, Types::CountryType, null: true
  field :travel_availability, String, null: true
  field :linkedin, String, null: true
  field :phone_number, String, null: true
  field :image, Types::AttachmentType, null: true
  field :skills, [String, null: true], null: true
  field :ratings, Types::Ratings, null: false
  field :reviews, [Types::Review], null: false
  field :reviewsCount, Integer, null: true
  field :previous_projects, [Types::PreviousProject], null: false

  def name
    "#{object.first_name} #{object.last_name}"
  end

  def skills
    object.skills.map(&:name)
  end

  def previous_projects
    ::PreviousProject.for_specialist(object)
  end
end
