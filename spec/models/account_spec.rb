# == Schema Information
#
# Table name: accounts
#
#  id               :integer          not null, primary key
#  name             :string(255)      default("")
#  user_id          :integer
#  balance_cents    :integer          default("0"), not null
#  balance_currency :string(255)      default("PLN"), not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_accounts_on_user_id  (user_id)
#

require 'rails_helper'

RSpec.describe Account, type: :model do
  it { should belong_to(:user) }
  it { should have_many(:profiles) }
  it { should have_many(:operations) }
  it { should have_many(:incomes) }
  it { should have_many(:expenses) }

  it { should validate_presence_of(:user_id) }
  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name).scoped_to(:user_id) }
  it { should validate_presence_of(:balance_cents) }

  context 'balance' do
    subject(:account) { create(:account) }
    let(:user) { account.user }
    it 'should be substracted by expense' do
      create(:expense, account_id: account.id, user_id: user.id, amount: -1000)
      expect(account.reload.balance.to_i).to eq(-1000)
    end

    it 'should add income' do
      create(:income, account_id: account.id, user_id: user.id, amount: 1000)
      expect(account.reload.balance.to_i).to eq(1000)
    end

    it 'should allow multiple expenses/incomes' do
      create(:income, account_id: account.id, user_id: user.id, amount: 1000)
      create(:expense, account_id: account.id, user_id: user.id, amount: -100)
      create(:expense, account_id: account.id, user_id: user.id, amount: -300)
      expect(account.reload.balance.to_i).to eq(600)
    end
  end
end
