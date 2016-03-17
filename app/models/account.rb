# This model contains all information about user balance
class Account < ActiveRecord::Base
  belongs_to :user, touch: true
end
