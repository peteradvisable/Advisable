# frozen_string_literal: true

module ResizedImage
  extend ActiveSupport::Concern

  ASSET_HOST = ENV['ORIGIN'] || "https://#{ENV['HEROKU_APP_NAME']}.herokuapp.com"

  class_methods do
    def resize(attachments)
      attachments.each do |name, options|
        define_method "resized_#{name}" do
          resized_image(name, options)
        end

        define_method "resized_#{name}_url" do
          resized_image_url(name, options)
        end
      end
    end
  end

  private

  def resized_image(name, options)
    image = public_send(name)
    return if image.blank?

    if image.variant(options).processed?
      image.variant(options)
    else
      ResizeImageJob.perform_later(self, name, options)
      image
    end
  end

  def resized_image_url(name, options)
    image = resized_image(name, options)
    return if image.blank?

    if image.respond_to?(:variation)
      Rails.application.routes.url_helpers.rails_representation_url(image, host: ASSET_HOST)
    else
      Rails.application.routes.url_helpers.rails_blob_url(image, host: ASSET_HOST)
    end
  end
end
