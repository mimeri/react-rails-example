# frozen_string_literal: true

class CreateAppSettings < ActiveRecord::Migration[6.0]
  def change
    create_table :app_settings do |t|
      t.float :serviceProviderLockedFactor, default: 0.2
      t.float :wearLevelFactor, default: 0.1
      t.float :cloudLockedFactor, default: 0.9
      t.float :screenDefectFactor, default: 0.375
      t.float :bootupDefectFactor, default: 0.3
      t.float :previousRepairFactor, default: 0.1
      t.integer :singleton_guard

      t.timestamps
    end
    # add_index :app_settings, :singleton_guard, unique: true
  end
end
