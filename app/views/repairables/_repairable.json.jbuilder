# frozen_string_literal: true

json.extract! repairable, :id, :created_at, :updated_at
json.url repairable_url(repairable, format: :json)
