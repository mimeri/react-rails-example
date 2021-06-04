# frozen_string_literal: true

class LineItem < ApplicationRecord
  belongs_to :cart
  belongs_to :product

  def total_price
    product.price * quantity.to_i
  end
end
