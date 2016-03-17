require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:accounts) }

  it 'should create a default account after user create' do
    user = create(:user)
    expect(user.accounts).not_to be_empty
  end

  it 'should require at least one account' do

  end
end
