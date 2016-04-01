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

FactoryGirl.define do
  factory :account do
    sequence(:name) { |index| "account#{index}" }
    balance 0
    user
  end
end
