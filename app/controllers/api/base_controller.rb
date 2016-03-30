# Main module for all api controllers
module Api
  # Base controller for all api controllers
  class BaseController < ::ApplicationController
    include DeviseTokenAuth::Concerns::SetUserByToken
    respond_to    :json
    before_action :authenticate_user!
  end
end
