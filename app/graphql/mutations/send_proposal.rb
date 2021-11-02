# frozen_string_literal: true

module Mutations
  class SendProposal < Mutations::BaseMutation
    argument :application, ID, required: true
    argument :proposal_comment, String, required: false

    field :application, Types::ApplicationType, null: true

    def authorized?(**args)
      application = Application.find_by!(uid: args[:application])
      policy = ApplicationPolicy.new(current_user, application)
      return true if policy.send_proposal?

      ApiError.not_authorized("You do not have permission to send this proposal")
    end

    def resolve(**args)
      application = Application.find_by!(uid: args[:application])
      application.proposal_comment = args[:proposal_comment]
      application.status = "Proposed"

      success = current_account_responsible_for { application.save }
      ApiError.invalid_request(application.errors.full_messages.first) unless success

      application.project.update(status: "Proposal Received")
      application.project.sync_to_airtable

      {application: application}
    end
  end
end
