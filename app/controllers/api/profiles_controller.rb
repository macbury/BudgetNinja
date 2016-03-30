module Api
  # This resource return list of profiles for current user
  class ProfilesController < BaseController
    def index
      @profiles = current_user.profiles.all
      render json: @profiles
    end
  end
end
