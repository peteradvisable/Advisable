# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::ApplyForProject do
  let(:specialist) { create(:specialist) }
  let(:project) { create(:project, status: "Brief Confirmed", brief_confirmed_at: 2.hours.ago) }
  let(:context) { {current_user: specialist} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      applyForProject(input: {
        project: "#{project.uid}"
      }) {
        application {
          id
          status
        }
      }
    }
    GRAPHQL
  end

  describe "errors" do
    context "when specialist not logged in" do
      let(:context) { {current_user: nil} }

      it "raises an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"].first["extensions"]["type"]
        expect(error).to eq("NOT_AUTHENTICATED")
      end
    end

    context "when logged in user not a specialist" do
      let(:context) { {current_user: create(:user)} }

      it "raises an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"].first["extensions"]["type"]
        expect(error).to eq("INVALID_REQUEST")
      end
    end

    context "when has not been confirmed" do
      let(:project) { create(:project, brief_confirmed_at: nil) }

      it "raises an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"].first["extensions"]["code"]
        expect(error).to eq("PROJECT_NOT_CONFIRMED")
      end
    end

    context "when application with wrong status exists" do
      it "raises an error" do
        create(:application, project: project, specialist: specialist, status: "Application Accepted")
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"].first["extensions"]["code"]
        expect(error).to eq("APPLICATION_IN_A_WRONG_STATE")
      end
    end
  end
end
