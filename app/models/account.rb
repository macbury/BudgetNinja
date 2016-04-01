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

# This model contains all information about user balance
class Account < ActiveRecord::Base
  has_many :profiles, dependent: :nullify
  has_many :operations, dependent: :destroy
  has_many :incomes, dependent: :destroy
  has_many :expenses, dependent: :destroy

  belongs_to :user, touch: true
  belongs_to :profile
  monetize :balance_cents, as: :balance

  validates :user_id, presence: true
  validates :balance_cents, presence: true
  validates :name, presence: true, uniqueness: { scope: :user_id }

  before_destroy :validate_if_is_last_account?

  private

  def validate_if_is_last_account?
    errors.add(:base, I18n.t('.errors.last_account_deletion')) if user.reload.accounts.count <= 1
    errors.blank?
  end
end
