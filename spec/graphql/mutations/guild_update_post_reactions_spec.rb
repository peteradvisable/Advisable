require 'rails_helper'

RSpec.describe Mutations::Guild::UpdatePostReactions do
  let(:specialist) { create(:specialist, :guild) }
  let(:guild_post) { create(:guild_post) }
  let(:response_keys) { %w[guildUpdatePostReactions guildPost] }
  let(:reaction) { "THANK" }
  let(:query) {
    <<-GRAPHQL
    mutation {
      guildUpdatePostReactions(input: {
        guildPostId: "#{guild_post.id}"
        reaction: #{reaction},
      }) {
        guildPost {
          reacted
          reactionsCount
        }
      }
    }
    GRAPHQL
  }

  subject(:guild_update_post_reactions) do
    resp = AdvisableSchema.execute(query, context: {current_user: specialist})
    resp.dig("data", *response_keys)
  end

  it_behaves_like "guild specialist"

  describe "giving thanks for a post" do
    it "creates a new thanks reaction for a post" do
      expect { subject }.to change { guild_post.reload.reactionable_count }.from(0).to(1)
      expect(subject).to include({
        "reacted" => true,
        "reactionsCount" => 1
      })
    end

    it "is idempotent" do
      guild_post.reactions.create(specialist: specialist)
      expect { subject }.not_to(change { guild_post.reload.reactionable_count })
      expect(subject).to include({
        "reacted" => true,
        "reactionsCount" => 1
      })
    end
  end

  describe "removing thanks for a post" do
    let(:reaction) { "NONE" }

    it "removes an existing reaction for a post" do
      guild_post.reactions.create(specialist: specialist)
      expect(guild_post.reactionable_count).to eq(1)
      expect { subject }.to change { guild_post.reload.reactionable_count }.from(1).to(0)
      expect(subject).to include({
        "reacted" => false,
        "reactionsCount" => 0
      })
    end

    it "is idempotent" do
      expect { subject }.not_to(change { guild_post.reload.reactionable_count })
      expect(subject).to include({
        "reacted" => false,
        "reactionsCount" => 0
      })
    end
  end

  describe "notifications" do
    it "only updates the post reaction for the current_user" do
      specialists = create_list(:specialist, 5, :guild)
      specialists.each { |s| guild_post.reactions.create(specialist: s) }
      expect(guild_post.reactionable_count).to eq(5)

      expect { subject }.to change { guild_post.reload.reactionable_count }.from(5).to(6)
      expect(guild_post.reload.reactions.where(specialist: specialist).count).to eq(1)
      expect(subject).to include({
        "reacted" => true,
        "reactionsCount" => 6
      })
    end
  end
end
