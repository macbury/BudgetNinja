# == Schema Information
#
# Table name: profiles
#
#  id         :integer          not null, primary key
#  name       :string(255)      default(""), not null
#  account_id :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_profiles_on_account_id  (account_id)
#  index_profiles_on_user_id     (user_id)
#

FactoryGirl.define do
  factory :profile do
    sequence(:name) { |i| "profile#{i}" }
    user
  end
end
