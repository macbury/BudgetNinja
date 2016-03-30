# Helper for logging in users in feature tests
module FeatureDevise

  # Creates current_user with passed argumens
  def as_user(*args)
    let(:current_user) { FactoryGirl.create(*args) }
    let(:auth_headers) { current_user.create_new_auth_token }
    before(:each) do
      login_as(current_user, scope: :user, run_callbacks: false)
      create_cookie('authHeaders', auth_headers.to_json)
    end
  end

  # Logouts current user
  def as_guest
    before(:each) do
      logout(:user)
      expire_cookies
      delete_cookie('authHeaders')
    end
  end

end


module ControllerDevise
  # Creates current_user with passed argumens
  def as_user(*args)
    let(:current_user) { FactoryGirl.create(*args) }
    let(:auth_headers) { current_user.create_new_auth_token }
    before(:each) do
      sign_in(current_user)
      request.headers.merge!(auth_headers)
    end
  end
end
