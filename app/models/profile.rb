# This model helps identifie user that adds operations. It helps too to set default account to be used by profile
class Profile < ActiveRecord::Base
  belongs_to :user
  # Default account for profile
  belongs_to :account

  validates :user_id, presence: true
  validates :name, presence: true, uniqueness: { scope: :user_id }
end
