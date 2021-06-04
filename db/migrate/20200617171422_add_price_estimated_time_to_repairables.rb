# frozen_string_literal: true

class AddPriceEstimatedTimeToRepairables < ActiveRecord::Migration[6.0]
  def change
    remove_column :repairables, :model_year
    remove_column :repairables, :model
    remove_column :repairables, :manufacturer
    add_column :repairables, :repair_price, :float
    add_column :repairables, :estimated_time, :integer
    add_reference :repairables, :product
  end
end
