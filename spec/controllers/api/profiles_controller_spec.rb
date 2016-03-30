require 'rails_helper'

describe Api::ProfilesController, type: :controller do

  context 'as logged in user' do
    as_user(:user)

    context 'GET /' do
      before { xhr(:get, :index) }
      subject(:response_json) { response.body }
      it 'should be success' do
        expect(response).to be_success
      end

      it { should have_json_size(1).at_path('profiles') }
      it { should have_json_type(Integer).at_path('profiles/0/id') }
      it { should have_json_type(Integer).at_path('profiles/0/account_id') }
      it { should have_json_type(String).at_path('profiles/0/name') }
    end
  end

  context 'as guest' do
    it 'should return error that user is not authorized for index action' do
      xhr(:get, :index)
      expect(response).not_to be_success
    end
  end

end
