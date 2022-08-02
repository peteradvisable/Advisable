# frozen_string_literal: true

module CaseStudy
  class Topic < ApplicationRecord
    include Sluggable
    slug_from :name
    include Uid
    uid_prefix "cst"

    has_one_attached :icon

    validates :name, presence: true

    scope :by_position, -> { order("position ASC NULLS LAST") }

    def results
      Rails.cache.fetch("topic_#{uid}_results", expires_in: 1.week) do
        articles_for_interest.pluck(:article_id)
      end
    end

    def move_to!(position)
      ids_by_position = self.class.by_position.where.not(id:).pluck(:id)
      ids_by_position.insert(position.to_i - 1, id)
      ActiveRecord::Base.connection.execute("UPDATE case_study_topics SET position = array_position(array[#{ids_by_position.join(',')}]::bigint[], id)")
    end
  end
end

# == Schema Information
#
# Table name: case_study_topics
#
#  id          :bigint           not null, primary key
#  description :text
#  name        :string
#  position    :integer
#  slug        :string           not null
#  uid         :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_case_study_topics_on_slug  (slug) UNIQUE
#  index_case_study_topics_on_uid   (uid) UNIQUE
#
