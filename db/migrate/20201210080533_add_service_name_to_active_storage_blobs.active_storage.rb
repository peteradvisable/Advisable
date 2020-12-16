# This migration comes from active_storage (originally 20190112182829)
class AddServiceNameToActiveStorageBlobs < ActiveRecord::Migration[6.0]
  def up
    safety_assured do
      unless column_exists?(:active_storage_blobs, :service_name)
        add_column :active_storage_blobs, :service_name, :string

        if (configured_service = ActiveStorage::Blob.service.name)
          ActiveStorage::Blob.unscoped.update_all(service_name: configured_service) # rubocop:disable Rails/SkipsModelValidations
        end

        change_column :active_storage_blobs, :service_name, :string, null: false
      end
    end
  end

  def down
    safety_assured do
      remove_column :active_storage_blobs, :service_name
    end
  end
end
