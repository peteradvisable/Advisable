class Search < ApplicationRecord
  include Uid

  belongs_to :user
  belongs_to :recommended_project,
             class_name: 'PreviousProject', required: false
  belongs_to :manually_recommended_project,
             class_name: 'PreviousProject', required: false

  has_many :consultations

  def results
    @results ||=
      begin
        records = (search_by_skills + search_by_previous_projects).uniq
        records.sort_by { |s| s.average_score || 0 }.reverse
      end
  end

  def create_recommendation
    Search::Recommendations.new(self).create_recommendation
  end

  private

  def base_search
    @base_search ||=
      begin
        query =
          Specialist.where('average_score >= ?', 65.0).where(
            test_account: [nil, false]
          ).where.not(hourly_rate: nil)
        query = filter_industry(query)
        query = filter_company_type(query)
        query
      end
  end

  def search_by_skills
    base_search.joins(:skills).where(skills: { name: skill })
  end

  def search_by_previous_projects
    base_search.joins(previous_projects: :skills).where(
      previous_projects: { skills: { name: skill } }
    )
  end

  def filter_industry(query)
    return query unless industry_experience_required
    joined = query.left_outer_joins(previous_projects: :industries)
    joined.where(previous_projects: { industries: { name: industry } })
  end

  # TODO: There is something a little od happening here where due to the fact that the underlying
  # table for previous projects is off_platform_projects we need to use that name in the where query
  # below
  def filter_company_type(query)
    return query unless company_experience_required
    joined = query.left_outer_joins(:previous_projects)
    joined.where(off_platform_projects: { company_type: company_type })
  end
end

# == Schema Information
#
# Table name: searches
#
#  id                              :bigint           not null, primary key
#  company_experience_required     :boolean
#  company_type                    :string
#  description                     :string
#  industry                        :string
#  industry_experience_required    :boolean
#  skill                           :string
#  uid                             :string
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#  manually_recommended_project_id :bigint
#  recommended_project_id          :bigint
#  user_id                         :bigint           not null
#
# Indexes
#
#  index_searches_on_manually_recommended_project_id  (manually_recommended_project_id)
#  index_searches_on_recommended_project_id           (recommended_project_id)
#  index_searches_on_uid                              (uid)
#  index_searches_on_user_id                          (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (manually_recommended_project_id => off_platform_projects.id)
#  fk_rails_...  (user_id => users.id)
#
