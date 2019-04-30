class OffPlatformProject < ApplicationRecord
  include Airtable::Syncable
  belongs_to :specialist
  has_many :reviews, as: :project
  has_many :project_skills, as: :project
  has_many :skills, through: :project_skills

  scope :validated, -> { where(validation_status: "Validated" )}

  def contact_name
    "#{contact_first_name} #{contact_last_name}"
  end

  def contact_name=(name)
    self.contact_first_name = name.split(" ").try(:[], 0)
    self.contact_last_name = name.split(" ").try(:[], 1)
  end
end
