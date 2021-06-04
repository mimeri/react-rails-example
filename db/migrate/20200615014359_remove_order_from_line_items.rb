# frozen_string_literal: true

class RemoveOrderFromLineItems < ActiveRecord::Migration[6.0]
  def change
    remove_column :line_items, :order_id, :reference
  end
end
