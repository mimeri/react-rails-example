# frozen_string_literal: true

class AdminController < ApplicationController
  before_action :authenticate_user!, :is_admin?
  before_action :set_order, only: [:order]

  def index; end

  def newimport
    render :new_import
  end

  def createimport
    Product.import(params[:file])
    respond_to do |format|
      format.html { redirect_to products_path, notice: 'Products imported successfully.' }
    end
  end

  def orders
    @orders = Order.all
  end

  def order; end

  private

  def set_order
    @order = Order.find(params[:id])
  end
end
