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

# This model helps identifie user that adds operations. It helps too to set default account to be used by profile
class Profile < ActiveRecord::Base
  belongs_to :user
  # Default account for profile
  belongs_to :account

  has_many :operations, dependent: :destroy
  has_many :incomes, dependent: :destroy
  has_many :expenses, dependent: :destroy

  validates :user_id, presence: true
  validates :name, presence: true, uniqueness: { scope: :user_id }
end
