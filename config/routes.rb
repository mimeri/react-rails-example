# frozen_string_literal: true

Rails.application.routes.draw do
  resources :charges, only: %i[new create]
  resources :line_items
  get '/products/:id/repairs', to: 'products#repairs'
  get '/products/estimate_price', to: 'products#estimate_price'
  get 'search/index'
  devise_for :users
  get 'user', to: 'users#show', as: 'myorders'
  resources :products
  resources :repairables
  resources :search, only: [:index]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'pages#index'
  get 'send/:id', to: 'pages#sendForm'
  get 'sales', to: 'sales#index'
  get '/admin/import', to: 'admin#newimport'
  post '/admin/import', to: 'admin#createimport'
  get '/admin/orders', to: 'admin#orders'
  get '/admin/orders/:id', to: 'admin#order'

  resources :app_setting, only: %i[edit update show]

  get 'cart', to: 'carts#show', as: 'mycart'

  resources :orders, only: [:show]
end
