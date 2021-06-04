# frozen_string_literal: true

class ProductsController < ApplicationController
  before_action :set_product, only: %i[show repairs edit update destroy]
  before_action :authenticate_user!, :is_admin?, only: %i[new create edit update destroy]

  def index
    @products = if !params[:search].present?
                  Product.all
                else
                  Product.search(params[:search])
                end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @products, status: :ok }
    end
    # format.json { render json: @products, status: :ok}
  end

  # GET /products/estimate_price
  # GET /products.json
  def estimate_price
    product = Product.find_by(model: price_estimate_params[:model])
    setting = AppSetting.instance

    price = if product.base_price.present?
              product.base_price
            else
              -1
            end

    if price_estimate_params[:previousRepairs].present?
      price -= price * setting[:previousRepairFactor] * Float(price_estimate_params[:previousRepairs])
    end
    if price_estimate_params[:wearLevel].present?
      price -= price * setting[:wearLevelFactor] * Float(price_estimate_params[:wearLevel])
    end
    price *= setting[:serviceProviderLockedFactor] if price_estimate_params[:serviceProviderLocked] == 'true'
    price *= setting[:cloudLockedFactor] if price_estimate_params[:cloudLocked] == 'true'
    price *= setting[:bootupDefectFactor] if price_estimate_params[:bootupDefect] == 'true'
    price *= setting[:screenDefectFactor] if price_estimate_params[:screenDefect] == 'true'

    # binding.pry
    price -= price % 25 # Around to closest 25
    render json: price
  end

  def show; end

  def repairs
    render :repairs
  end

  def new
    @product = Product.new
    @product.repairables.build
  end

  def edit
    @product.repairables.build
  end

  def create
    @product = Product.new(product_params)
    respond_to do |format|
      if @product.save
        format.html { redirect_to @product, notice: 'Product was successfully created.' }
        format.json { render :show, status: :created, location: @product }
      else
        format.html { render :new }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @product.update(product_params)
        format.html { redirect_to @product, notice: 'Product was successfully updated.' }
        format.json { render :show, status: :ok, location: @product }
      else
        format.html { render :edit }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @product.destroy
    respond_to do |format|
      format.html { redirect_to products_url, notice: 'Product was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :description, :manufacturer, :model, :quantity, :price, :productimage, :is_repairable, :is_buying, :is_selling, :base_price, repairables_attributes: %i[repair_name estimated_time repair_price])
  end

  def price_estimate_params
    # params.fetch(:product, {})
    params.permit(:model, :storage, :serviceProviderLocked, :wearLevel, :cloudLocked, :bootupDefect, :screenDefect, :previousRepairs)
  end
end
