# frozen_string_literal: true

class OrderMailer < ApplicationMailer
  default from: 'matthew.serre@gmail.com'

  def order_email(order)
    @order = order
    mail(to: @order.email, subject: "Summary for Somsaem Order #{@order.id}")
  end
end
