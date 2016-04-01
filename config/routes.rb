# == Route Map
#
#                   Prefix Verb   URI Pattern                            Controller#Action
#         new_user_session GET    /api/auth/sign_in(.:format)            devise_token_auth/sessions#new
#             user_session POST   /api/auth/sign_in(.:format)            devise_token_auth/sessions#create
#     destroy_user_session DELETE /api/auth/sign_out(.:format)           devise_token_auth/sessions#destroy
# cancel_user_registration GET    /api/auth/cancel(.:format)             devise_token_auth/registrations#cancel
#        user_registration POST   /api/auth(.:format)                    devise_token_auth/registrations#create
#    new_user_registration GET    /api/auth/sign_up(.:format)            devise_token_auth/registrations#new
#   edit_user_registration GET    /api/auth/edit(.:format)               devise_token_auth/registrations#edit
#                          PATCH  /api/auth(.:format)                    devise_token_auth/registrations#update
#                          PUT    /api/auth(.:format)                    devise_token_auth/registrations#update
#                          DELETE /api/auth(.:format)                    devise_token_auth/registrations#destroy
#  api_auth_validate_token GET    /api/auth/validate_token(.:format)     devise_token_auth/token_validations#validate_token
#         api_auth_failure GET    /api/auth/failure(.:format)            devise_token_auth/omniauth_callbacks#omniauth_failure
#                          GET    /api/auth/:provider/callback(.:format) devise_token_auth/omniauth_callbacks#omniauth_success
#                          GET    /omniauth/:provider/callback(.:format) devise_token_auth/omniauth_callbacks#redirect_callbacks
#         omniauth_failure GET    /omniauth/failure(.:format)            devise_token_auth/omniauth_callbacks#omniauth_failure
#                          GET    /api/auth/:provider(.:format)          redirect(301)
#             api_profiles GET    /api/profiles(.:format)                api/profiles#index {:format=>:json}
#                          POST   /api/profiles(.:format)                api/profiles#create {:format=>:json}
#          new_api_profile GET    /api/profiles/new(.:format)            api/profiles#new {:format=>:json}
#         edit_api_profile GET    /api/profiles/:id/edit(.:format)       api/profiles#edit {:format=>:json}
#              api_profile GET    /api/profiles/:id(.:format)            api/profiles#show {:format=>:json}
#                          PATCH  /api/profiles/:id(.:format)            api/profiles#update {:format=>:json}
#                          PUT    /api/profiles/:id(.:format)            api/profiles#update {:format=>:json}
#                          DELETE /api/profiles/:id(.:format)            api/profiles#destroy {:format=>:json}
#                          GET    /*path(.:format)                       welcome#index
#                     root GET    /                                      welcome#index
#

Rails.application.routes.draw do
  scope '/api' do
    mount_devise_token_auth_for 'User', at: 'auth'
  end

  namespace :api, constraints: { format: :json }, defaults: { format: :json } do
    resources :profiles
  end

  # Map all routes to welcome#index for React SPA
  get '*path' => 'welcome#index'
  root 'welcome#index'
end
