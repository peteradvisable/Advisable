class Airtable::Application < Airtable::Base
  self.table_name = 'Applications'

  belongs_to :specialist, class: 'Specialist', column: 'Expert'

  sync_with ::Application
  sync_column 'Score', to: :score
  sync_column 'Hourly Rate For Project', to: :rate
  sync_column 'Available To Start', to: :availability
  sync_column 'One Line Overview', to: :introduction
  sync_column 'Advisable Comment', to: :comment
  sync_column 'Rejected Reason', to: :rejection_reason
  sync_column 'Rejected Reason Comment', to: :rejection_reason_comment
  sync_column 'Proposal Comment', to: :proposal_comment
  sync_column 'Invitation Rejected Reason', to: :invitation_rejection_reason
  sync_column 'Referral URL', to: :referral_url
  sync_column 'Applied At', to: :applied_at
  sync_column 'Project Type', to: :project_type
  sync_column 'Monthly Limit', to: :monthly_limit
  sync_column 'Stopped Working Reason', to: :stopped_working_reason
  sync_column 'Application Status - Invited To Apply - Timestamp',
              to: :invited_to_apply_at
  sync_column 'Application Status - Invitation Rejected - Timestamp',
              to: :invitation_rejected_at
  sync_column 'Application Status - Application Rejected - Timestamp',
              to: :application_rejected_at
  sync_column 'Application Status - Application Accepted - Timestamp',
              to: :application_accepted_at
  sync_column 'Application Status - Interview Scheduled - Timestamp',
              to: :interview_scheduled_at
  sync_column 'Application Status - Interview Completed - Timestamp',
              to: :interview_completed_at
  sync_column 'Application Status - Proposed - Timestamp', to: :proposal_sent_at
  sync_column 'Application Status - Working - Timestamp',
              to: :started_working_at
  sync_column 'Application Status - Stopped Working - Timestamp',
              to: :stopped_working_at

  sync_data do |application|
    application.status = status_to_sync
    application.accepts_fee = fields['Accepts Fee'] == 'Yes'
    application.accepts_terms = fields['Accepts Terms'] == 'Yes'
    application.featured = fields['Featured Candidate'] == 'Yes'
    application.references_requested = fields['References Requested'] == 'Yes'
    application.hidden = fields['Application Hidden'] == 'Yes'
    application.hide_from_profile = fields['Hide From Profile'] == 'Yes'

    if self['Trial Program']
      application.trial_program = self['Trial Program'].include?('Yes')
    end

    specialist_id = fields['Expert'].try(:first)

    if specialist_id
      specialist = ::Specialist.find_by_airtable_id(specialist_id)
      if specialist.nil?
        specialist = Airtable::Specialist.find(specialist_id).sync
      end
      application.specialist = specialist
    end

    project_id = fields['Client Project'].try(:first)

    if project_id
      project = ::Project.find_by_airtable_id(project_id)
      project = Airtable::Project.find(project_id).sync if project.nil?
      application.project = project
    end

    # Build the questions array
    questions = []

    if fields['Answer 1']
      questions <<
        { question: fields['Question 1'], answer: fields['Answer 1'] }
    end

    if fields['Answer 2']
      questions <<
        { question: fields['Question 2'], answer: fields['Answer 2'] }
    end

    # If the application questions is not equal to the questions array then set
    # it to the questions variable
    if (application.questions || []) != questions
      application.questions = questions
    end

    application.auto_apply = self['Auto Apply'].try(:include?, 'Yes')
  end

  def status_to_sync
    status = fields['Application Status']
    # candidates that have a scheduled or complete interview status should still
    # be considered 'Application Accepted' so that they should up in the
    # "Introduced" view.
    if ['Interview Scheduled', 'Interview Completed'].include?(status)
      return 'Application Accepted'
    end

    # Sync any records with a status of To Be Invited as "Invited To Apply"
    return 'Invited To Apply' if status == 'To Be Invited'
    status
  end

  push_data do |application|
    self['Application Status'] = application.status
    if application.saved_change_to_introduction?
      self['One Line Overview'] = application.introduction
    end
    if application.saved_change_to_availability?
      self['Available To Start'] = application.availability
    end
    if application.saved_change_to_invitation_rejection_reason?
      self['Invitation Rejected Reason'] =
        application.invitation_rejection_reason
    end
    if application.saved_change_to_questions?
      self['Answer 1'] = application.questions.try(:first).try(:[], 'answer')
    end
    if application.saved_change_to_questions?
      self['Answer 2'] = application.questions.try(:second).try(:[], 'answer')
    end
    if application.saved_change_to_questions?
      self['Question 1'] =
        application.questions.try(:first).try(:[], 'question')
    end
    if application.saved_change_to_questions?
      self['Question 2'] =
        application.questions.try(:second).try(:[], 'question')
    end
    self['Trial Program'] = application.trial_program ? 'Yes' : 'No'

    references_project_ids =
      application.references.where(project_type: 'Project').map do |r|
        r.project.airtable_id
      end
    self['References - Projects'] = references_project_ids

    references_off_platform_project_ids =
      application.references.where(project_type: 'OffPlatformProject')
        .map { |r| r.project.airtable_id }
    self['References - Off Platform Projects'] =
      references_off_platform_project_ids

    if application.saved_change_to_rate?
      self['Hourly Rate For Project'] = application.rate.try(:to_f)
    end

    self['Accepts Terms'] = nil if application.accepts_terms.nil?
    self['Accepts Terms'] = 'Yes' if application.accepts_terms == true
    self['Accepts Terms'] = 'No' if application.accepts_terms == false

    self['Accepts Fee'] = nil if application.accepts_fee.nil?
    self['Accepts Fee'] = 'Yes' if application.accepts_fee == true
    self['Accepts Fee'] = 'No' if application.accepts_fee == false

    self['Applied At'] = application.applied_at
    self['Rejected Reason'] = application.rejection_reason
    self['Proposal Comment'] = application.proposal_comment
    self['Rejected Reason Comment'] = application.rejection_reason_comment
    self['References Requested'] =
      application.references_requested ? 'Yes' : nil
    self['Project Type'] = application.project_type
    self['Monthly Limit'] = application.monthly_limit
    self['Stopped Working Reason'] = application.stopped_working_reason
    self['Expert'] = [application.specialist.try(:airtable_id)].compact
    self['Client Project'] = [application.project.try(:airtable_id)].compact
    self['Auto Apply'] = 'Yes' if application.auto_apply
    self['Auto Apply'] = 'No' if application.auto_apply == false
  end
end
