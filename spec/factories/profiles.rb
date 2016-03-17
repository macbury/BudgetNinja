FactoryGirl.define do
  factory :profile do
    sequence(:name) { |i| "profile#{i}" }
  end
end
