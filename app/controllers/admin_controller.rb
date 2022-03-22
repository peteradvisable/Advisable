# frozen_string_literal: true

class AdminController < ApplicationController
  layout "tailwind"
  before_action :admin?

  def finance
    finance_email = "Advisable Finance <finance@advisable.com>"
    GenerateFinanceCsvJob.perform_later(finance_email)
    redirect_to admin_index_path, notice: "Finance report is being emailed to #{finance_email}"
  end
end