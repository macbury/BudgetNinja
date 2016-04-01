# Helps swiching user profile
module ProfileSupport

  # Create new profile for current user and select it
  def with_profile(factory_name)
    let(:profile_cookie_name) { 'COOKIE_SELECTED_PROFILE_ID' }
    let(:main_profile) { FactoryGirl.create(factory_name, user_id: current_user.id) }
    before(:each) do
      create_cookie(profile_cookie_name, CGI.escape(ProfileSerializer.new(main_profile, root: false).to_json), path: '/')
    end
  end

  # Unselects profile
  def without_profile
    let(:profile_cookie_name) { 'COOKIE_SELECTED_PROFILE_ID' }
    before(:each) do
      delete_cookie(profile_cookie_name)
    end
  end

end
