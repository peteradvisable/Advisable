class AccountMailer < ApplicationMailer
  def confirm(uid:, token: )
    @account = Account.find_by_uid(uid)
    @token = token
    mail(to: @account.email, subject: "Account Confirmation")
  end

  def reset_password(uid:,token:)
    @account = Account.find_by_uid(uid)
    @token = token
    mail(to: @account.email, subject: "Reset password")
  end
end
