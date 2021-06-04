# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_cart
  helper_method :is_admin?, :set_user

  private

  def after_sign_out_path_for(_resource_or_scope)
    session[:cart_id] = nil
    root_path
  end

  def is_admin?
    if current_user
      if current_user.admin?
      else
        respond_to do |format|
          format.html { redirect_to root_path }
        end
      end
    end
  end

  def set_cart
    @cart = Cart.find(session[:cart_id])
  rescue ActiveRecord::RecordNotFound
    @cart = Cart.create
    session[:cart_id] = @cart.id
  end

  def set_user
    @user = current_user
  end
end
