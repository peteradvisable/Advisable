class Mutations::CreateConsultation < Mutations::BaseMutation
  argument :specialist, ID, required: true
  argument :first_name, String, required: true
  argument :last_name, String, required: true
  argument :email, String, required: true
  argument :company, String, required: true
  argument :availability, [String], required: true
  argument :skills, [String], required: true
  argument :topic, String, required: true

  field :consultation, Types::ConsultationType, null: true

  def resolve(**args)
    ActiveRecord::Base.transaction do
      consultation = create_consultation(**args)
      { consultation: consultation }
    end
  end

  private

  def create_consultation(**args)
    if args[:skills].empty?
      raise ApiError::InvalidRequest.new("consultation.noSkills", "You must provide a list of skills")
    end

    skill_ids = args[:skills].map do |skill|
      Skill.find_by_name!(skill).airtable_id
    end

    consultation = Consultation.create(
      user: user(**args),
      specialist: specialist(args[:specialist]),
      status: "Request Started",
      skills: skill_ids,
      topic: args[:topic],
    )

    consultation.sync_to_airtable
    consultation
  end

  def specialist(specialist_id)
    @specialist ||= Specialist.find_by_airtable_id!(specialist_id)
  end

  def user(**args)
    @user ||= begin
      user = User.find_by_email(args[:email])
      return user if user.present?

      user = User.create(
        first_name: args[:first_name],
        last_name: args[:last_name],
        email: args[:email],
        company_name: args[:company],
      )
      
      domain = user.email.split("@").last
      client = Client.create(name: args[:company], domain: domain)
      user.sync_to_airtable
      # Currently we dont have a relationship between clients and client
      # contacts so we set the 'Client Contacts' column while calling sync.
      client.sync_to_airtable({ "Client Contacts" => [user.airtable_id].compact })
      user
    end
  end
end
