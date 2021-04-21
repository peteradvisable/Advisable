# frozen_string_literal: true

require "rails_helper"

RSpec.describe Recommendation do
  subject(:recommender) do
    described_class.recommend(specialist)
  end

  let(:specialist) { create(:specialist, :guild) }

  context "with skills" do
    let(:same_skills) do
      create_list(:skill, 2) do |skill, i|
        skill.name = "name_#{i}"
      end
    end

    let(:match) { create(:specialist, :guild) }

    before do
      stub_const("Recommendation::RECOMMENDERS", [Recommendation::Skills])
      specialist.update!(skills: same_skills)
    end

    it "makes a recommendation when there's > 1 skill in common" do
      specialist.update!(skills: same_skills)
      match.update!(skills: same_skills)
      expect(recommender.recommendation).to eq(match)
      expect(recommender.skills).to eq(same_skills)
    end

    it "makes a recommendation when there's > 1 project_skill in common" do
      skills = create_list(:skill, 2)
      create(:previous_project, specialist: match, skills: skills)
      create(:previous_project, specialist: specialist, skills: skills)
      expect(recommender.recommendation).to eq(match)
      expect(recommender.skills).to eq(skills)
    end

    it "makes a recommendation when there's > 1 project_skill OR skill total in common" do
      same_skill, project_skill = same_skills
      same_skill.update!(name: "regular_skill")
      project_skill.update!(name: "project_skill")

      match.update!(skills: [same_skill])
      create(:previous_project, specialist: match, skills: [project_skill])

      expect(recommender.recommendation).to eq(match)
      expect(recommender.skills).to eq([same_skill, project_skill])
    end

    it "does not have a recommendation" do
      stub_const("Recommendation::RECOMMENDERS", [Recommendation::Skills])
      # no match
      create(:specialist, :guild, skills: [])
      expect(recommender.recommendation).to eq(nil)
    end
  end

  context "with industries" do
    let(:same_industry) { create(:industry, name: 'Education') }
    let(:diff_industry) { create(:industry, name: 'Aerospace') }

    before do
      same_industry.previous_projects.create!(specialist: specialist)
    end

    it "makes a recommendation if there are > 0 industries in common" do
      stub_const("Recommendation::RECOMMENDERS", [Recommendation::Industry])
      match = create(:specialist, :guild)
      same_industry.previous_projects.create!(specialist: match)

      expect(recommender.recommendation).to eq(match)
      expect(recommender.industries).to eq([same_industry])
    end
  end

  context "with random" do
    it "creates a recommendation" do
      stub_const("Recommendation::RECOMMENDERS", [Recommendation::Random])
      others = create_list(:specialist, 2, :guild)

      expect(others).to include(recommender.recommendation)
      expect(recommender).not_to respond_to(:skills)
      expect(recommender).not_to respond_to(:industries)
    end
  end
end
