# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  provider               :string(255)      default("email"), not null
#  uid                    :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default("0"), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  confirmation_token     :string(255)
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string(255)
#  email                  :string(255)
#  tokens                 :text(65535)
#  created_at             :datetime
#  updated_at             :datetime
#
# Indexes
#
#  index_users_on_email                 (email)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_uid_and_provider      (uid,provider) UNIQUE
#

FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password(8) }
    password_confirmation { password }

    trait :with_one_account do
      account
    end
  end
end
