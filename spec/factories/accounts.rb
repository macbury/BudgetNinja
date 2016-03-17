FactoryGirl.define do
  factory :account do
    sequence(:name) { |index| "account#{index}" }
    balance 0
  end
end
