FactoryGirl.define do
  factory :user do
    sequence(:email) { |index| "email#{index}@test.local" }
    password 'admin1234'
    password_confirmation 'admin1234'

    trait :with_one_account do
      account
    end
  end
end
