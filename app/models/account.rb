# This model contains all information about user balance
class Account < ActiveRecord::Base
  has_many :profiles, dependent: :nullify
  belongs_to :user, touch: true
  belongs_to :profile
  monetize :balance_cents, as: :balance

  validates :user_id, presence: true
  validates :balance_cents, presence: true
  validates :name, presence: true, uniqueness: { scope: :user_id }

  before_destroy :validate_if_is_last_account?

  private

  #
  def validate_if_is_last_account?
    errors.add(:base, I18n.t('.errors.last_account_deletion')) if user.reload.accounts.count <= 1
    errors.blank?
  end
end
