# frozen_string_literal: true

class AddFieldsAgainToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :is_repairable, :bool, default: false
    add_column :products, :base_price, :float
  end
end
