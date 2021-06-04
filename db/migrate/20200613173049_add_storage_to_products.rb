# frozen_string_literal: true

class AddStorageToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :storage, :string
  end
end
