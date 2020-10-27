# The SpecialistOrUser module contains of all the login for user accounts. Both Users and
# Specialists are able to login to the system and act as user accounts.
module SpecialistOrUser
  extend ActiveSupport::Concern

  included do
    include Tutorials

    belongs_to :account

    # Temporary while we're moving things over
    before_validation :ensure_account_exists

    # Sets the confirmation digest and sends the user a confirmation email with
    # instructions to confirm their account.
    def send_confirmation_email
      token = account.create_confirmation_token
      AccountMailer.confirm(uid: uid, token: token).deliver_later
    end

    def ensure_account_exists
      return if self[:email].blank?
      if account.blank?
        self.account = Account.find_or_create_by!(email: self[:email])
      elsif account.new_record?
        account.save!
      end
    end
  end

  # TODO: AccountMigration - columns that we migrated to Account
  Account::MIGRATED_COLUMNS.each do |column|
    define_method(column) do
      Raven.capture_message("Method #{column} called on #{self.class.name} that was meant for Account", backtrace: caller, level: 'debug')
      account&.public_send(column)
    end

    define_method("#{column}=") do |param|
      Raven.capture_message("Method #{column}= called on #{self.class.name} that was meant for Account", backtrace: caller, level: 'debug')
      account&.public_send("#{column}=", param)
    end
  end

  def name
    Raven.capture_message("Method called on #{self.class.name} that was meant for Account", backtrace: caller, level: 'debug')
    account.name
  end

  [:find_by_email, :find_by_remember_token].each do |method|
    define_singleton_method(method) do |param|
      Account.public_send(method, param)&.specialist_or_user
    end

    define_singleton_method("#{method}!") do |param|
      public_send(method, param).presence || raise(ActiveRecord::RecordNotFound)
    end
  end

  [
    :find_by_uid_or_airtable_id,
    :find_by_uid,
    :find_by_airtable_id
  ].each do |method|
    define_singleton_method(method) do |param|
      Specialist.public_send(method, param) || User.public_send(method, param)
    end

    define_singleton_method("#{method}!") do |param|
      public_send(method, param).presence || raise(ActiveRecord::RecordNotFound)
    end
  end
end
