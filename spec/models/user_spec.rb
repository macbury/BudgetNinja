require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:accounts) }
  it { should have_many(:profiles) }

  it 'should create a default account and profile after user create' do
    user = create(:user)
    expect(user.accounts).not_to be_empty
    expect(user.profiles).not_to be_empty
  end

  it 'should require at least one account' do
    user = create(:user)
    account = user.accounts.first
    expect(account.destroy).to eq(false)
    expect(user.accounts.count).to eq(1)
  end
end
