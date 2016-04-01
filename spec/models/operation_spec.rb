# == Schema Information
#
# Table name: operations
#
#  id              :integer          not null, primary key
#  amount_cents    :integer          default("0"), not null
#  amount_currency :string(255)      default("PLN"), not null
#  note            :string(255)
#  type            :string(255)
#  profile_id      :integer
#  account_id      :integer          not null
#  user_id         :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_operations_on_account_id  (account_id)
#  index_operations_on_profile_id  (profile_id)
#  index_operations_on_user_id     (user_id)
#

require 'rails_helper'

RSpec.describe Operation, type: :model do
  it { should belong_to(:profile) }
  it { should belong_to(:account) }
  it { should validate_presence_of(:amount_cents) }
  it { should validate_presence_of(:account_id) }
  it { should validate_presence_of(:user_id) }

  it 'should not allow me to use other account that assigned to user' do
    income = build(:income)
    account_injection = create(:account)
    expect(income).to be_valid
    income.account = account_injection
    expect(income).not_to be_valid
  end

  it 'should not allow me to use other profile that assigned to user' do
    income = build(:income)
    profile_injection = create(:profile)
    expect(income).to be_valid
    income.profile = profile_injection
    expect(income).not_to be_valid
  end
end
