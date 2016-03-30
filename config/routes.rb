Rails.application.routes.draw do
  scope '/api' do
    mount_devise_token_auth_for 'User', at: 'auth'
  end

  namespace :api do
    resources :profiles
  end

  # Map all routes to welcome#index for React SPA
  get '*path' => 'welcome#index'
  root 'welcome#index'
end
