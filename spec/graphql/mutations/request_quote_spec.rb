require 'rails_helper'

describe Mutations::RequestQuote do
  let(:task) { create(:task, stage: 'Not Assigned') }

  let(:query) do
    <<-GRAPHQL
    mutation {
      requestQuote(input: {
        task: "#{task.uid}",
      }) {
        task {
          id
          stage
        }
        errors {
          code
        }
      }
    }
    GRAPHQL
  end

  let(:context) { { current_user: task.application.project.user } }

  before :each do
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
  end

  it "sets the stage to 'Quote Requested'" do
    response = AdvisableSchema.execute(query, context: context)
    stage = response['data']['requestQuote']['task']['stage']
    expect(stage).to eq('Quote Requested')
  end

  it 'triggers a webhook' do
    expect(WebhookEvent).to receive(:trigger).with(
      'tasks.quote_requested',
      any_args
    )
    AdvisableSchema.execute(query, context: context)
  end

  context 'when the task does not have a name' do
    let(:task) { create(:task, stage: 'Not Assigned', name: nil) }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['requestQuote']['errors'][0]
      expect(error['code']).to eq('tasks.nameRequired')
    end
  end

  context 'when the task does not have a description' do
    let(:task) { create(:task, stage: 'Not Assigned', description: nil) }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['requestQuote']['errors'][0]
      expect(error['code']).to eq('tasks.descriptionRequired')
    end
  end

  context "when the user doesn't have access to the project" do
    let(:context) { { current_user: create(:user) } }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['requestQuote']['errors'][0]
      expect(error['code']).to eq('not_authorized')
    end
  end

  context 'when there is no user' do
    let(:context) { { current_user: nil } }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['requestQuote']['errors'][0]
      expect(error['code']).to eq('not_authorized')
    end
  end

  context 'when the specialist is logged in' do
    let(:context) { { current_user: task.application.specialist } }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['requestQuote']['errors'][0]
      expect(error['code']).to eq('not_authorized')
    end
  end

  context 'when the task stage is Assigned' do
    let(:task) { create(:task, stage: 'Assigned') }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['requestQuote']['errors'][0]
      expect(error['code']).to eq('tasks.cantRequestQuote')
    end
  end

  context 'when the task stage is Working' do
    let(:task) { create(:task, stage: 'Working') }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['requestQuote']['errors'][0]
      expect(error['code']).to eq('tasks.cantRequestQuote')
    end
  end

  context 'when the task stage is Submitted' do
    let(:task) { create(:task, stage: 'Submitted') }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['requestQuote']['errors'][0]
      expect(error['code']).to eq('tasks.cantRequestQuote')
    end
  end
end
