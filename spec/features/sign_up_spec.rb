require 'rails_helper'

feature 'User sign up', js: true do
  let(:auth_path) { '/auth' }
  let(:logout_button) { 'Logout' }
  let(:email_label) { 'E-mail' }
  let(:password_label) { 'Password' }
  let(:password_confirmation_label) { 'Password confirmation' }
  let(:sign_up_button) { 'Sign up' }
  context 'as guest' do
    as_guest

    scenario 'i should be able to create new account' do
      user = build(:user)
      visit auth_path

      fill_in email_label, with: user.email
      fill_in password_label, with: user.password
      fill_in password_confirmation_label, with: user.password

      click_on sign_up_button
    end
  end

  context 'as logged in user' do
    as_user(:user)

    scenario 'i should be redirected to root_path from /auth' do
      visit auth_path
      expect(page).to have_content(logout_button)
    end
  end
end
