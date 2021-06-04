# frozen_string_literal: true

class Order < ApplicationRecord
  has_many :order_items
  belongs_to :user, optional: true
end
