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

require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:accounts) }
  it { should have_many(:profiles) }
  it { should have_many(:operations) }

  it 'should create a default account and profile after user create' do
    user = create(:user)
    expect(user.accounts).not_to be_empty
    expect(user.profiles).not_to be_empty
  end

  it 'should require at least one account' do
    user = create(:user)
    account = user.accounts.first
    expect(account.destroy).to eq(false)
    expect(user.accounts.count).to eq(1)
  end
end
