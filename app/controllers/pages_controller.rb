# frozen_string_literal: true

class PagesController < ApplicationController
  def index; end

  def sendForm
    @product = Product.find(params[:id])
    render :sendDeviceForm
  end
end
