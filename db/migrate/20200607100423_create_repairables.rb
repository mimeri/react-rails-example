# frozen_string_literal: true

class CreateRepairables < ActiveRecord::Migration[6.0]
  def change
    create_table :repairables, &:timestamps
  end
end
