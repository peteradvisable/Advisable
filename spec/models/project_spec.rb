require 'rails_helper'

describe Project do
  include_examples "Airtable::Syncable"
  it { should validate_presence_of(:name) }
  it { should have_many(:applications) }

  describe "#deposit" do
    context "when there is no deposit" do
      it "returns 0" do
        project = build(:project, deposit: nil)
        expect(project.deposit).to eq(0)
      end
    end

    context "when there is a deposit" do
      it "returns the deposit" do
        project = build(:project, deposit: 500)
        expect(project.deposit).to eq(500)
      end
    end
  end

  describe '#accepted_terms=' do
    it 'sets accepted_terms_at to the current time' do
      project = create(:project, accepted_terms_at: nil)
      project.accepted_terms = true
      expect(project.accepted_terms_at).to be_within(1.second).of(DateTime.now)
    end

    context 'when accepted_terms_at is already set' do
      it 'does not change the accepted_terms_at' do
        project = create(:project, accepted_terms_at: 5.days.ago)
        project.accepted_terms = true
        expect(project.accepted_terms_at).to be_within(1.second).of(5.days.ago)
      end
    end
  end

  describe "#deposit_paid" do
    context "when there is no deposit_paid" do
      it "returns 0" do
        project = build(:project, deposit_paid: nil)
        expect(project.deposit_paid).to eq(0)
      end
    end

    context "when there is a deposit_paid" do
      it "returns the deposit_paid" do
        project = build(:project, deposit_paid: 500)
        expect(project.deposit_paid).to eq(500)
      end
    end
  end

  describe "#deposit_owed" do
    context "when they have not paid any of the deposit" do
      it "returns the total amount" do
        project = build(:project, deposit: 1_000, deposit_paid: 0)
        expect(project.deposit_owed).to eq(1_000)
      end
    end

    context "when the deposit has been paid" do
      it "returns 0" do
        project = build(:project, deposit: 1_000, deposit_paid: 1_000)
        expect(project.deposit_owed).to eq(0)
      end
    end

    context "when some of the deposit has been paid" do
      it "returns the remainder" do
        project = build(:project, deposit: 1_000, deposit_paid: 500)
        expect(project.deposit_owed).to eq(500)
      end
    end
  end

  describe "#applications_open" do
    context "when sales_status is Won" do
      it "returns false" do
        project = create(:project, sales_status: "Won")
        expect(project.applications_open).to be_falsey
      end
    end

    context "when sales_status is Lost" do
      it "returns false" do
        project = create(:project, sales_status: "Lost")
        expect(project.applications_open).to be_falsey
      end
    end

    context "when sales_status is Open" do
      it "returns true" do
        project = create(:project, sales_status: "Open")
        expect(project.applications_open).to be_truthy
      end
    end

    context "when sales_status is nil" do
      it "returns true" do
        project = create(:project, sales_status: nil)
        expect(project.applications_open).to be_truthy
      end
    end
  end
end
