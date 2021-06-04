# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!, :set_user

  def show
    @user
    @orders = Order.where(email: @user.email.to_s)
  end
end
