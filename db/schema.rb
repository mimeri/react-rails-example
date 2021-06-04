# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_200_628_163_839) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'active_storage_attachments', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'record_type', null: false
    t.bigint 'record_id', null: false
    t.bigint 'blob_id', null: false
    t.datetime 'created_at', null: false
    t.index ['blob_id'], name: 'index_active_storage_attachments_on_blob_id'
    t.index %w[record_type record_id name blob_id], name: 'index_active_storage_attachments_uniqueness', unique: true
  end

  create_table 'active_storage_blobs', force: :cascade do |t|
    t.string 'key', null: false
    t.string 'filename', null: false
    t.string 'content_type'
    t.text 'metadata'
    t.bigint 'byte_size', null: false
    t.string 'checksum', null: false
    t.datetime 'created_at', null: false
    t.index ['key'], name: 'index_active_storage_blobs_on_key', unique: true
  end

  create_table 'app_settings', force: :cascade do |t|
    t.float 'serviceProviderLockedFactor', default: 0.2
    t.float 'wearLevelFactor', default: 0.1
    t.float 'cloudLockedFactor', default: 0.9
    t.float 'screenDefectFactor', default: 0.375
    t.float 'bootupDefectFactor', default: 0.3
    t.float 'previousRepairFactor', default: 0.1
    t.integer 'singleton_guard'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'carts', force: :cascade do |t|
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'line_items', force: :cascade do |t|
    t.bigint 'product_id', null: false
    t.bigint 'cart_id'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.integer 'quantity', default: 1
    t.index ['cart_id'], name: 'index_line_items_on_cart_id'
    t.index ['product_id'], name: 'index_line_items_on_product_id'
  end

  create_table 'order_items', force: :cascade do |t|
    t.bigint 'order_id', null: false
    t.bigint 'product_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.float 'price'
    t.bigint 'repairable_id', null: false
    t.index ['order_id'], name: 'index_order_items_on_order_id'
    t.index ['product_id'], name: 'index_order_items_on_product_id'
    t.index ['repairable_id'], name: 'index_order_items_on_repairable_id'
  end

  create_table 'orders', force: :cascade do |t|
    t.string 'email'
    t.float 'total'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'pg_search_documents', force: :cascade do |t|
    t.text 'content'
    t.string 'searchable_type'
    t.bigint 'searchable_id'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index %w[searchable_type searchable_id], name: 'index_pg_search_documents_on_searchable_type_and_searchable_id'
  end

  create_table 'products', force: :cascade do |t|
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.string 'name'
    t.text 'description'
    t.integer 'quantity'
    t.float 'price'
    t.string 'manufacturer'
    t.string 'model'
    t.boolean 'is_repairable', default: false
    t.float 'base_price'
    t.string 'storage'
    t.boolean 'is_selling'
    t.boolean 'is_buying'
    t.index ['model'], name: 'index_products_on_model', unique: true
  end

  create_table 'repairables', force: :cascade do |t|
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.float 'repair_price'
    t.integer 'estimated_time'
    t.bigint 'product_id'
    t.string 'repair_name'
    t.index ['product_id'], name: 'index_repairables_on_product_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'email', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.boolean 'admin', default: false
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index ['reset_password_token'], name: 'index_users_on_reset_password_token', unique: true
  end

  add_foreign_key 'active_storage_attachments', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'line_items', 'carts'
  add_foreign_key 'line_items', 'products'
  add_foreign_key 'order_items', 'orders'
  add_foreign_key 'order_items', 'products'
  add_foreign_key 'order_items', 'repairables'
end
