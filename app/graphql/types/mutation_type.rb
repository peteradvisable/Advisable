class Types::MutationType < GraphQL::Schema::Object
  field :start_working, mutation: Mutations::StartWorking
  field :stop_working, mutation: Mutations::StopWorking
  field :send_proposal, mutation: Mutations::SendProposal

  field :request_introduction, mutation: Mutations::RequestIntroduction
  field :accept_interview_request, mutation: Mutations::AcceptInterviewRequest
  field :request_more_interview_times,
        mutation: Mutations::RequestMoreInterviewTimes
  field :resend_interview_request, mutation: Mutations::ResendInterviewRequest
  field :request_references, mutation: Mutations::RequestReferences

  field :reject_proposal, mutation: Mutations::RejectProposal
  field :reject_application, mutation: Mutations::RejectApplication
  field :reject_application_invitation,
        mutation: Mutations::RejectApplicationInvitation
  field :update_application, mutation: Mutations::UpdateApplication
  field :submit_application, mutation: Mutations::SubmitApplication
  field :set_type_for_project, mutation: Mutations::SetTypeForProject

  field :update_availability, mutation: Mutations::UpdateAvailability

  field :update_project, mutation: Mutations::UpdateProject
  field :confirm_project, mutation: Mutations::ConfirmProject
  field :publish_project, mutation: Mutations::PublishProject

  field :create_previous_project, mutation: Mutations::CreatePreviousProject
  field :update_previous_project, mutation: Mutations::UpdatePreviousProject
  field :publish_previous_project, mutation: Mutations::PublishPreviousProject
  field :verify_previous_project, mutation: Mutations::VerifyPreviousProject
  field :review_previous_project, mutation: Mutations::ReviewPreviousProject
  field :fail_previous_project_verification,
        mutation: Mutations::FailPreviousProjectVerification

  field :create_previous_project_image,
        mutation: Mutations::CreatePreviousProjectImage
  field :update_previous_project_image,
        mutation: Mutations::UpdatePreviousProjectImage
  field :delete_previous_project_image,
        mutation: Mutations::DeletePreviousProjectImage

  field :login, mutation: Mutations::Login
  field :logout, mutation: Mutations::Logout
  field :signup, mutation: Mutations::Signup
  field :confirm_account, mutation: Mutations::ConfirmAccount
  field :create_freelancer_account, mutation: Mutations::CreateFreelancerAccount
  field :resend_confirmation_email, mutation: Mutations::ResendConfirmationEmail
  field :request_password_reset, mutation: Mutations::RequestPasswordReset
  field :reset_password, mutation: Mutations::ResetPassword
  field :create_user_account, mutation: Mutations::CreateUserAccount
  field :create_user_from_project_verification,
        mutation: Mutations::CreateUserFromProjectVerification

  field :update_profile, mutation: Mutations::UpdateProfile

  field :create_task, mutation: Mutations::CreateTask
  field :update_task, mutation: Mutations::UpdateTask
  field :delete_task, mutation: Mutations::DeleteTask
  field :request_quote, mutation: Mutations::RequestQuote
  field :assign_task, mutation: Mutations::AssignTask
  field :start_task, mutation: Mutations::StartTask
  field :submit_task, mutation: Mutations::SubmitTask
  field :approve_task, mutation: Mutations::ApproveTask
  field :set_task_repeat, mutation: Mutations::SetTaskRepeat
  field :request_to_start, mutation: Mutations::RequestToStart

  field :complete_tutorial, mutation: Mutations::CompleteTutorial
  field :update_project_payment_method,
        mutation: Mutations::UpdateProjectPaymentMethod
  field :create_setup_intent, mutation: Mutations::CreateSetupIntent

  field :update_payment_settings, mutation: Mutations::UpdatePaymentSettings
  field :complete_setup, mutation: Mutations::CompleteSetup

  field :create_consultation, mutation: Mutations::CreateConsultation
  field :update_consultation, mutation: Mutations::UpdateConsultation
  field :decline_consultation, mutation: Mutations::DeclineConsultation
  field :accept_consultation, mutation: Mutations::AcceptConsultation
  field :send_consultation_request, mutation: Mutations::SendConsultationRequest
  field :request_consultations, mutation: Mutations::RequestConsultations

  field :create_search, mutation: Mutations::CreateSearch
  field :submit_full_application, mutation: Mutations::SubmitFullApplication

  field :create_job, mutation: Mutations::CreateJob
  field :delete_job, mutation: Mutations::DeleteJob
  field :toggle_sourcing, mutation: Mutations::ToggleSourcing

  field :update_user, mutation: Mutations::UpdateUser
  field :start_client_application, mutation: Mutations::StartClientApplication
  field :update_client_application, mutation: Mutations::UpdateClientApplication
  field :submit_client_application, mutation: Mutations::SubmitClientApplication
  field :request_application_reminder,
        mutation: Mutations::RequestApplicationReminder
  field :request_application_callback,
        mutation: Mutations::RequestApplicationCallback
  
  # Guild
  field :create_guild_comment,
        mutation: Mutations::Guild::CreateComment
  field :delete_guild_comment,
        mutation: Mutations::Guild::DeleteComment
end
