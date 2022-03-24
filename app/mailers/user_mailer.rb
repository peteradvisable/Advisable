# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def confirm(uid:, token:)
    @user = User.find_by!(uid:)
    @token = token
    mail(to: @user.account.email, subject: "Account Confirmation")
  end

  def interview_reschedule_request(interview)
    @interview = interview
    @sales_person = interview.user.company.sales_person
    mail(from: @sales_person.email_with_name, to: interview.user.account.email, subject: "Interview Reschedule Request")
  end

  def invited_by_manager(manager, user)
    @manager = manager
    @user = user
    mail(to: user.account.email, subject: "#{manager.account.first_name} invited you to Advisable")
  end

  def invited_to_review_applications(inviter, user, project, application_id: nil)
    @inviter = inviter
    @user = user
    @project = project
    @url = application_url(application_id)
    mail(to: @user.account.email, subject: "#{@inviter.account.first_name} invited you to review applications for a #{@project.try(:name)} project on Advisable")
  end

  def invited_to_interview(inviter, user, application)
    @inviter = inviter
    @user = user
    @application = application
    @project = @application.project
    @url = application_url(@application.uid)
    mail(to: @user.account.email, subject: "#{@inviter.account.first_name} invited you to join the #{@project.try(:name)} interview with #{@application.specialist.account.name} on Advisable")
  end

  def case_study_searches_refreshed(user, updated_searches)
    @user = user
    @account = @user.account
    @searches = updated_searches.map do |search, articles|
      [CaseStudy::Search.find(search), CaseStudy::Article.where(id: articles)]
    end
    mail(to: @account.email, subject: "You Have New Recommendations") do |f|
      f.html { render(layout: "email_v2") }
    end
  end

  def case_study_shared(shared_article)
    @user = shared_article.shared_with
    @shared_article = shared_article
    mail(to: @user.account.email, subject: "#{shared_article.shared_by.name} shared a case study with you: #{shared_article.article.title}")
  end

  def invoice_generated(invoice)
    @invoice = invoice

    pdf = Faraday.get(invoice.pdf_url)
    return unless pdf.success?

    attachments["#{invoice.first_day.strftime("%Y-%m")}-advisable-invoice.pdf"] = {mime_type: "application/pdf", content: pdf.body}
    mail(
      to: invoice.company.billing_email,
      cc: "finance@advisable.com",
      subject: "#{invoice.first_day.strftime("%B %Y")} invoice from Advisable"
    )
  end

  def payment_receipt(payment)
    @payment = payment
    mail(to: payment.company.billing_email, subject: "Your payment was successful") do |f|
      f.html { render(layout: "email_v2") }
    end
  end

  def payment_invoice(payment)
    @payment = payment

    pdf = Faraday.get(payment.pdf_url)
    raise "Payment does not have a pdf" unless pdf.success?

    attachments["#{payment.uid.sub(/^pay_/, '')}-advisable-invoice.pdf"] = {mime_type: "application/pdf", content: pdf.body}
    mail(
      to: payment.company.billing_email,
      cc: "finance@advisable.com",
      subject: "Invoice from Advisable (#{payment.uid.sub(/^pay_/, '')})"
    )
  end

  def need_more_time_options(interview)
    @interview = interview
    @sales_person = interview.user.company.sales_person
    mail(
      from: @sales_person.email_with_name,
      to: interview.user.account.email,
      subject: "Need More Time Options"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def interview_reminder(interview)
    @interview = interview
    @sales_person = interview.user.company.sales_person
    mail(
      from: @sales_person.email_with_name,
      to: interview.user.account.email,
      bcc: [@sales_person.email_with_name, ENV["CONSULTATIONS_BCC"]].compact,
      subject: "Your call with #{interview.specialist.account.name} in 1 hour"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def post_interview(interview)
    @interview = interview
    @account = interview.user.account
    @sales_person = interview.user.company.sales_person

    mail(
      from: "Advisable <hello@advisable.com>",
      to: interview.user.account.email,
      bcc: @sales_person.email_with_name,
      subject: "Do you want to continue your conversation with #{interview.specialist.account.name}?"
    ) do |format|
      format.html { render layout: "email_v2" }
    end
  end

  def interview_declined(interview, message)
    @account = interview.user.account
    @specialist = interview.specialist
    @message = message

    mail(
      to: @account.email,
      from: "hello@advisable.com",
      subject: "Consultation Request Declined: #{@specialist.account.name}"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def consultation_declined(consultation, message)
    @account = consultation.user.account
    @specialist = consultation.specialist
    @message = message

    mail(
      to: @account.email,
      from: "hello@advisable.com",
      subject: "Consultation Request Declined: #{@specialist.account.name}"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def new_agreement(agreement)
    @account = agreement.user.account
    @agreement = agreement
    @conversation = agreement.messages.find_by(kind: "AgreementCreated").conversation

    mail(
      to: @account.email,
      from: "hello@advisable.com",
      subject: "#{@agreement.specialist.account.name} has requested to work together on Advisable"
    ) do |format|
      format.html { render layout: "email_v2" }
    end
  end

  def payment_request_mail(payment_request)
    @payment_request = payment_request
    @agreement = payment_request.agreement

    mail(
      from: "Advisable <finance@advisable.com>",
      to: payment_request.company.billing_email,
      cc: @agreement.user.account.email,
      subject: "New Payment Request",
      bcc: "finance@advisable.com"
    ) do |format|
      format.html { render layout: "email_v2" }
    end
  end
  alias payment_request payment_request_mail
  alias payment_request_reminder payment_request_mail

  private

  def application_url(application_id)
    if application_id.present?
      "#{default_url_options[:host]}/projects/#{@project.uid}/candidates/#{application_id}"
    else
      "#{default_url_options[:host]}/projects/#{@project.uid}/matches"
    end
  end

  def default_sales_person_for(company)
    SalesPerson.default_for_user || company.sales_person
  end
end
