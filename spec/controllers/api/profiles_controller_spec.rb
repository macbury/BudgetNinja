require 'rails_helper'

describe Api::ProfilesController, type: :controller do

  context 'as logged in user' do
    as_user(:user)
    it 'should return list of profiles for index action' do
      get :index
      expect(response).to be_success
      expect(response.body).to have_json_size(1)
    end
  end

  context 'as guest' do
    it 'should return error that user is not authorized for index action' do
      get :index
      expect(response).not_to be_success
    end
  end

end
