# frozen_string_literal: true

json.array! @repairables, partial: 'repairables/repairable', as: :repairable
