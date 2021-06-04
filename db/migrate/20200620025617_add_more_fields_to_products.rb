# frozen_string_literal: true

class AddMoreFieldsToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :is_selling, :boolean
    add_column :products, :is_buying, :boolean
  end
end
