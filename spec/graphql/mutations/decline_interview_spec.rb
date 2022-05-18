# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::DeclineInterview do
  let(:user) { create(:user) }
  let(:specialist) { create(:specialist) }
  let(:current_user) { specialist }
  let(:interview) { create(:interview, accounts: [specialist.account, user.account], status: "Call Requested") }
  let(:context) { {current_user:} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      declineInterview(input: {
        interview: "#{interview.uid}",
        reason: "Not interested"
      }) {
        interview {
          id
        }
      }
    }
    GRAPHQL
  end

  it "sets the interview status to 'Specialist Rejected'" do
    expect(interview.status).to eq("Call Requested")
    AdvisableSchema.execute(query, context:)
    expect(interview.reload.status).to eq("Specialist Declined")
  end

  context "when a message exists" do
    let(:conversation) { create(:conversation) }

    before do
      conversation.participants.create(account: current_user.account)
      create(:message, interview:, conversation:)
    end

    it "creates a system message" do
      expect(conversation.messages.where(kind: "InterviewDeclined")).not_to exist
      AdvisableSchema.execute(query, context:)
      expect(conversation.messages.where(kind: "InterviewDeclined")).to exist
    end

    it "creates a user message" do
      AdvisableSchema.execute(query, context:)
      last_message = conversation.messages.last
      expect(last_message.content).to eq("Not interested")
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "interview_declined", "deliver_now", {args: [interview, last_message]}).once
    end
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end

  context "when the current user is a user" do
    let(:current_user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_SPECIALIST")
    end
  end

  context "when the current user is another specialist" do
    let(:current_user) { create(:specialist) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when the interview has already been declined" do
    let(:interview) { create(:interview, accounts: [specialist.account, user.account], status: "Specialist Declined") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("CANNOT_DECLINE")
    end
  end
end
