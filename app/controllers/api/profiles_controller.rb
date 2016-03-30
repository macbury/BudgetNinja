module Api
  # This resource return list of profiles for current user
  class ProfilesController < BaseController

    def index
      render json: {}
    end

  end
end
