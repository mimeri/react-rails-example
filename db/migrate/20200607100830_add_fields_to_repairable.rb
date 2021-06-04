# frozen_string_literal: true

class AddFieldsToRepairable < ActiveRecord::Migration[6.0]
  def change
    add_column :repairables, :model, :string
    add_column :repairables, :manufacturer, :string
    add_column :repairables, :model_year, :integer
  end
end
