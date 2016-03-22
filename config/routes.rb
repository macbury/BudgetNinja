Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  # Map all routes to welcome#index for React SPA
  get '*path' => 'welcome#index'
  root 'welcome#index'
end
