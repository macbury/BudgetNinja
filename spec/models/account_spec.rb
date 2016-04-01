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
end
