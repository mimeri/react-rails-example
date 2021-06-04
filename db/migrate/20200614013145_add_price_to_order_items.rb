# frozen_string_literal: true

class AddPriceToOrderItems < ActiveRecord::Migration[6.0]
  def change
    add_column :order_items, :price, :float
  end
end
