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

require 'rails_helper'

RSpec.describe Profile, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:account) }
  it { should have_many(:operations) }
  it { should have_many(:incomes) }
  it { should have_many(:expenses) }

  it { should validate_presence_of(:user_id) }
  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name).scoped_to(:user_id) }
end
