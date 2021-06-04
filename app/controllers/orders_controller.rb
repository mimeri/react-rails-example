# frozen_string_literal: true

class OrdersController < ApplicationController
  def show
    @order = Order.find(params[:id])
    OrderMailer.order_email(@order).deliver_now
  end
end
