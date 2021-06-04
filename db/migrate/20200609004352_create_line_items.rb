# frozen_string_literal: true

class CreateLineItems < ActiveRecord::Migration[6.0]
  def change
    create_table :line_items do |t|
      t.references :product, null: false, foreign_key: true
      t.belongs_to :cart, foreign_key: true, optional: true

      t.timestamps
    end
  end
end
