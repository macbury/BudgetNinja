# This model is used for authorizing and logging user
class User < ActiveRecord::Base
  has_many :accounts, dependent: :destroy

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
