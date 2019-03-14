# Sends a password reset email to a given account. An account can either be
# a user or specialist.
# @param account The account that the password request is being sent for.
class Accounts::RequestPasswordReset < ApplicationService
  attr_reader :account

  def initialize(account)
    @account = account
  end

  def call
    return unless has_account?
    account.update_attributes({
      reset_digest: Token.digest(token),
      reset_sent_at: Time.zone.now
    })

    AccountMailer.reset_password(uid: account.uid, token: token).deliver_later
  end

  private

  def has_account?
    return true if account.has_account?

    if account.is_a?(Specialist)
      WebhookEvent.trigger(
        "specialists.forgotten_password_for_non_account",
        WebhookEvent::Specialist.data(account)
      )

      raise Service::Error.new("request_password_reset.application_required")
    end
  end

  def token
    @token ||= Token.new
  end
end