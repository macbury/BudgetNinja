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

# Income operation model
class Income < Operation
  validates :amount_cents, numericality: { greater_than: 0 }
end
