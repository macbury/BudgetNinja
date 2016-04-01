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

# Base operation class for Income and Expenses
class Operation < ActiveRecord::Base
  belongs_to :profile
  belongs_to :account
  belongs_to :user

  validates :profile_id, inclusion: { in: -> (operation) { operation.user ? operation.user.profiles.pluck(:id) : [] } }, allow_blank: true
  validates :account_id, presence: true, inclusion: { in: -> (operation) { operation.user ? operation.user.accounts.pluck(:id) : [] } }
  validates :user_id, presence: true
  validates :amount_cents, presence: true

  monetize :amount_cents, as: :amount
end
