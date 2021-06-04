# frozen_string_literal: true

class LineItemsController < ApplicationController
  before_action :set_line_item, only: [:destroy]
  before_action :set_cart, only: %i[create destroy]

  def create
    @product = Product.find(params[:product_id])
    @line_item = LineItem.new(product_id: @product.id, cart_id: @cart.id)
    if @line_item.save
      redirect_to mycart_path, notice: 'Item added successfully.'
    else
      redirect_to @product, notice: 'Could not add item to cart.  Please try again.'
    end
  end

  def destroy
    @line_item.destroy
    redirect_to mycart_path, notice: 'Item removed from cart successfully.'
  end

  private

  def set_line_item
    @line_item = LineItem.find(params[:id])
  end
end
