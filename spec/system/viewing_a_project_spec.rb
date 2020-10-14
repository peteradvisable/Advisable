require 'rails_helper'

RSpec.describe 'Viewing a project' do
  context 'when the project user has not created an account yet' do
    it 'redirects the user to create an account' do
      user = create(:user, account: create(:account, password: nil))
      project = create(:project, user: user)
      visit "/projects/#{project.uid}"

      mail = double('Mail')
      allow(mail).to receive(:deliver_later)
      allow(AccountMailer).to receive(:confirm).and_return(mail)
      allow_any_instance_of(User).to receive(:sync_to_airtable)

      expect(page).to have_content('Create your Account')
      fill_in 'password', with: 'testing123'
      fill_in 'passwordConfirmation', with: 'testing123'
      click_on 'Signup'
      expect(page).to have_current_path("/projects/#{project.uid}")
    end
  end

  context 'when the project user has created an account' do
    it 'redirects to the login page' do
      user = create(:user, account: create(:account, password: 'testing123'))
      project = create(:project, user: user, status: 'Brief Confirmed')
      visit "/projects/#{project.uid}"
      fill_in 'email', with: user.email
      fill_in 'password', with: 'testing123'
      click_on 'Login'
      expect(page).to have_current_path("/projects/#{project.uid}")
    end
  end
end
