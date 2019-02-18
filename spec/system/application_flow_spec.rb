require 'rails_helper'

describe 'Application flow' do
  before :each do
    airtable_record = double(Airtable::Application)
    allow(airtable_record).to receive(:push)
    allow(Airtable::Application).to receive(:find).and_return(airtable_record)
    # mock the skills endpoint for the add a previous project modal
    skill = double(Airtable:Skill, id: "rec_123", fields: { "Name" => "Testing" })
    allow(Airtable::Skill).to receive(:active).and_return([skill])
  end

  let(:application) {
    create(:application, {
      status: "Invited To Apply",
      questions: [{
        question: "Is this a test?"
      }, {
        question: "Is this another question?"
      }]
    })
  }

  describe 'Overview step' do
    it 'Continues to the questions step' do
      visit "/invites/#{application.airtable_id}/apply"
      fill_in :introduction, with: "This is my intro"
      find('label', text: "Immediately").click
      click_on 'Next'
      expect(page).to have_content("Application Questions")
    end

    context 'when there are no questions' do
      let(:application) {
        create(:application, {
          status: "Invited To Apply",
          questions: []
        })
      }

      it 'goes to the references step' do
        visit "/invites/#{application.airtable_id}/apply"
        fill_in :introduction, with: "This is my intro"
        find('label', text: "Immediately").click
        click_on 'Next'
        expect(page).to have_content("We require references from all")
      end
    end
  end

  describe 'Questions step' do
    it 'proceeeds to the next question' do
      visit "/invites/#{application.airtable_id}/apply/questions"
      fill_in :answer, with: "This is my answer"
      click_on 'Next'
      expect(page).to have_content("Is this another question?")
    end

    context 'when on the last question' do
      let(:application) {
        create(:application, {
          status: "Invited To Apply",
          questions: [{
            answer: "This has been answered",
            question: "Is this a test?"
          }, {
            question: "Is this another question?"
          }]
        })
      }

      it 'proceeds to the references step' do
        visit "/invites/#{application.airtable_id}/apply/questions/2"
        fill_in :answer, with: "This is my answer"
        click_on 'Next'
        expect(page).to have_content("We require references from all")
      end
    end

    context "when there are no questions" do
      let(:application) {
        create(:application, {
          status: "Invited To Apply",
          questions: []
        })
      }

      it 'proceeds to the references step' do
        visit "/invites/#{application.airtable_id}/apply/questions"
        expect(page).to have_content("We require references from all")
      end
    end
  end

  describe 'References step' do
    context 'when the specialist has previous projects' do
      let!(:specialist) { create(:specialist) }
      let!(:project) { create(:off_platform_project, specialist: specialist) }
      let(:application) { 
        create(:application, specialist: specialist, status: "Invited To Apply")
      }

      it 'proceeds to the payment terms' do
        visit "/invites/#{application.airtable_id}/apply/references"
        find('span', text: "#{project.primary_skill} at #{project.client_name}").click
        click_on 'Next'
        expect(page).to have_content("Including Advisable's fee")
      end

      it 'allows the user to add another previous project' do
        visit "/invites/#{application.airtable_id}/apply/references"
        click_on 'Add a previous project'
        expect(page).to have_content("What was the client's name?")
      end
    end

    context 'when the user has no previous projects' do
      let!(:specialist) { create(:specialist) }
      let(:application) { 
        create(:application, specialist: specialist, status: "Invited To Apply")
      }

      it 'allows the user to add another previous project' do
        visit "/invites/#{application.airtable_id}/apply/references"
        click_on 'Add a previous project'
        expect(page).to have_content("What was the client's name?")
      end
    end
  end

  describe 'Terms step' do
    before :each do
      create(:application_reference, application: application)
    end

    it 'completes the application process' do
      visit "/invites/#{application.airtable_id}/apply/terms"
      fill_in 'rate', with: '100'
      find('label', text: 'I agree that If Advisable connects me to a client that I successfully contract with, 20% of my fees are payable to Advisable and all payments go through Advisable.').click
      find('span', text: "I agree with").sibling("span[class^='styles__Box']").click
      click_on 'Submit Application'
      expect(page).to have_content("Application sent!")
    end
  end

  context 'when the application status is Invitation Rejeceted' do
    let(:application) { create(:application, status: "Invitation Rejected") }

    it 'redirects to the job listing page' do
      visit "/invites/#{application.airtable_id}/apply"
      expect(page).to have_content("You have already rejected this invitation")
    end
  end
end