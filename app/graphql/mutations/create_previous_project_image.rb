# frozen_string_literal: true

module Mutations
  class CreatePreviousProjectImage < Mutations::BaseMutation
    description "Attaches an image to a previous project"
    argument :attachment, String, required: true
    argument :previous_project, ID, required: true

    field :image, Types::PreviousProjectImage, null: true

    def authorized?(previous_project:, **_args)
      requires_specialist!
      project = PreviousProject.find_by!(uid: previous_project)
      policy = PreviousProjectPolicy.new(current_user, project)
      policy.create_image?
    end

    def resolve(previous_project:, attachment:)
      project = PreviousProject.find_by!(uid: previous_project)
      blob = ActiveStorage::Blob.find_signed!(attachment)
      project.images.attach(blob)
      image = project.reload.images.find_by_blob_id(blob.id)

      {image: image}
    end
  end
end
