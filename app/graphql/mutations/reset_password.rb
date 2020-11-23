class Mutations::ResetPassword < Mutations::BaseMutation
  argument :email, String, required: true
  argument :token, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  field :reset, Boolean, null: true

  def authorized?(**args)
    account = Account.find_by!(email: args[:email])

    if account.reset_sent_at.blank?
      ApiError.invalid_request(code: "RESET_NOT_REQUESTED", message: "Password reset has not been requested")
    end

    if account.reset_sent_at <= 5.hours.ago
      ApiError.invalid_request(code: "RESET_EXPIRED", message: "Password reset token has expired")
    end

    unless BCrypt::Password.new(account.reset_digest).is_password?(args[:token])
      ApiError.invalid_request(code: "INVALID_TOKEN", message: "Invalid password reset token")
    end

    true
  end

  def resolve(**args)
    account = Account.find_by!(email: args[:email])

    account.assign_attributes(
      password: args[:password],
      password_confirmation: args[:password_confirmation],
      reset_sent_at: nil,
      reset_digest: nil
    )

    if account.save
      {reset: true}
    else
      ApiError.invalid_request(code: "VALIDATION_FAILED", message: account.errors.full_messages.first)
    end
  end
end
