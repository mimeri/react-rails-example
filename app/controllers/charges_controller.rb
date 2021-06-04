# frozen_string_literal: true

class ChargesController < ApplicationController
  before_action :set_cart

  def new; end

  def create
    @amount = Integer(params[:amount].to_f * 100)
    @amount.to_i

    customer = Stripe::Customer.create(
      email: params[:stripeEmail],
      source: params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      customer: customer.id,
      amount: @amount,
      description: 'Somsaem Stripe customer',
      currency: 'usd'
    )
    @amount /= 100
    @order = Order.create(email: params[:stripeEmail], total: @amount)
    @cart.line_items.each do |item|
      product = Product.find(item.product.id)
      product.quantity -= 1
      product.save
      OrderItem.create(order_id: @order.id, product_id: item.product.id, price: item.product.price)
    end

    @cart.destroy

    redirect_to order_path(@order)
  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end
end
