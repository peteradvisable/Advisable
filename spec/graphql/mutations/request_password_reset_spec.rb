require 'rails_helper'

RSpec.describe Mutations::RequestPasswordReset do
  let(:account) { create(:account, reset_sent_at: nil, reset_digest: nil) }
  let!(:user) { create(:user, account: account) }
  let(:email) { account.email }
  let(:query) do
    <<-GRAPHQL
    mutation {
      requestPasswordReset(input: {
        email: "#{email}"
      }) {
        sent
        errors {
          code
        }
      }
    }
    GRAPHQL
  end

  before :each do
    mail = double('confirmation email')
    allow(mail).to receive(:deliver_later)
    allow(AccountMailer).to receive(:reset_password).and_return(mail)
  end

  it 'returns sent true' do
    response = AdvisableSchema.execute(query, context: {})
    sent = response['data']['requestPasswordReset']['sent']
    expect(sent).to be_truthy
  end

  it 'sends a password reset email' do
    mail = double('confirmation email')
    expect(mail).to receive(:deliver_later)
    expect(AccountMailer).to receive(:reset_password).and_return(mail)
    AdvisableSchema.execute(query, context: {})
  end

  it 'sets the reset_digest' do
    expect(user.account.reload.reset_digest).to be_nil
    AdvisableSchema.execute(query, context: {})
    expect(user.account.reload.reset_digest).to_not be_nil
  end

  it 'sets the reset_sent_at' do
    expect(user.account.reload.reset_sent_at).to be_nil
    AdvisableSchema.execute(query, context: {})
    expect(user.account.reload.reset_sent_at).to_not be_nil
  end

  context 'when the email doesnt exist' do
    let(:email) { 'doesntexist@advisable.com' }
    let(:response) { AdvisableSchema.execute(query, context: {}) }

    it 'returns an error' do
      error = response['data']['requestPasswordReset']['errors'][0]
      expect(error['code']).to eq('request_password_reset.account_not_found')
    end

    it 'sets sent to false' do
      expect(response['data']['requestPasswordReset']['sent']).to be_falsey
    end
  end

  context 'when the account is a specialist' do
    let(:account) { create(:account, reset_sent_at: nil, reset_digest: nil, password: nil) }
    let(:user) { create(:specialist, account: account) }

    context 'and they specialist doesnt have an account yet' do
      it 'triggers a webhook event' do
        expect(WebhookEvent).to receive(:trigger).with(
          'specialists.forgotten_password_for_non_account',
          WebhookEvent::Specialist.data(user)
        )
        AdvisableSchema.execute(query, context: {})
      end

      it 'returns an error' do
        response = AdvisableSchema.execute(query, context: {})
        error = response['data']['requestPasswordReset']['errors'][0]
        expect(error['code']).to eq(
          'request_password_reset.application_required'
        )
      end
    end
  end
end
