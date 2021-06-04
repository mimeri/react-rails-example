# frozen_string_literal: true

class AddFieldsToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :name, :string
    add_column :products, :description, :text
    add_column :products, :quantity, :integer
    add_column :products, :price, :float
    add_column :products, :manufacturer, :string
    add_column :products, :model, :string
  end
end
