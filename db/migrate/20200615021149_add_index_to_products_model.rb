# frozen_string_literal: true

class AddIndexToProductsModel < ActiveRecord::Migration[6.0]
  def change
    add_index :products, :model, unique: true
  end
end
