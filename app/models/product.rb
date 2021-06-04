# frozen_string_literal: true

require 'csv'
class Product < ApplicationRecord
  has_one_attached :productimage
  has_many :line_items
  has_many :order_items
  has_many :repairables
  accepts_nested_attributes_for :repairables

  # validates :name, :manufacturer, :model, :description, :quantity, :price, presence: true
  validates :model, uniqueness: true

  include PgSearch::Model
  pg_search_scope :search, against: %i[name model manufacturer]

  before_destroy :not_referenced_by_any_line_item
  belongs_to :user, optional: true

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      unless Product.find_by(model: row[2])
        product = Product.new
        product.name = row[0]
        product.manufacturer = row[1]
        product.model = row[2]
        product.description = row[3]
        product.quantity = row[4]
        product.price = row[5]
        product.is_repairable = row[6]
        product.base_price = row[7]
        product.save
      end
    end
  end

  private

  def not_referenced_by_any_line_item
    unless line_items.empty?
      errors.add(:base, 'Line items present')
      throw :abort
    end
  end
end
