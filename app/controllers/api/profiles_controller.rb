module Api
  # This resource return list of profiles for current user
  class ProfilesController < BaseController
    def index
      render json: current_user.profiles.all
    end
  end
end
