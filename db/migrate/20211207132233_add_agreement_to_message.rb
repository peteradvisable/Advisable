# frozen_string_literal: true

class AddAgreementToMessage < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_reference :messages, :agreement, foreign_key: true
    end
  end
end