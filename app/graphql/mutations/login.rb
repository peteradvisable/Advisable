class Mutations::Login < Mutations::BaseMutation
  include Mutations::Helpers::Authentication

  argument :email, String, required: true
  argument :password, String, required: true

  field :viewer, Types::ViewerUnion, null: true

  def resolve(email:, password:)
    account = Account.find_by(email: email)
    no_account_error unless account&.has_password?
    invalid_credentials unless account.authenticate(password)
    login_as(account)
    context[:current_user] = account.specialist_or_user
    {viewer: account.specialist_or_user}
  end

  private

  def no_account_error
    ApiError.invalid_request(
      code: 'AUTHENTICATION_FAILED', message: 'Account does not exist'
    )
  end

  def invalid_credentials
    ApiError.invalid_request(
      code: 'AUTHENTICATION_FAILED', message: 'Invalid credentials'
    )
  end
end
