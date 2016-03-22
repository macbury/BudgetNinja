# This model is used for authorizing and logging user
class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User
  
  has_many :accounts, dependent: :destroy
  has_many :profiles, dependent: :destroy

  after_create :create_initial_account_and_profile!

  private

  # Creates first Account and Profile
  def create_initial_account_and_profile!
    account = accounts.create!(name: I18n.t('.default.account.name'))
    profiles.create!(name: I18n.t('.default.profile.name'), account_id: account.id)
  end
end
