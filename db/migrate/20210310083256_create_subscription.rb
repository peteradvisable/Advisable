# frozen_string_literal: true

class CreateSubscription < ActiveRecord::Migration[6.1]
  def change
    create_table :subscriptions, id: :uuid do |t|
      t.references :specialist, null: false, foreign_key: true
      t.references :tag, foreign_key: true, type: :uuid
      t.index %i[specialist_id tag_id], unique: true

      t.timestamps
    end
  end
end
