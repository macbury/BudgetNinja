require 'rails_helper'

feature 'User sign up', js: true do
  let(:auth_path) { '/register' }
  let(:logout_button) { 'Logout' }
  let(:email_label) { 'E-mail' }
  let(:password_label) { 'Password' }
  let(:password_confirmation_label) { 'Confirm password' }
  let(:sign_up_button) { 'Register' }
  let(:success_sign_up_flash_message) { 'Created new account! You can now log in!' }
  let(:select_profile_header) { 'Select your profile' }
  context 'as guest' do
    as_guest

    scenario 'i should be able to create new account' do
      user = build(:user)
      visit auth_path

      fill_in email_label, with: user.email
      fill_in password_confirmation_label, with: user.password
      fill_in password_label, with: user.password

      click_on sign_up_button

      expect(page).to have_content(success_sign_up_flash_message)
      expect(User.count).to eq(1)
    end

    scenario 'i should get errors after entering wrong data into fields' do
      user = create(:user)
      visit auth_path

      fill_in email_label, with: user.email
      fill_in password_confirmation_label, with: user.password
      fill_in password_label, with: 'test'

      click_on sign_up_button

      expect(page).to have_content('already in use')
      expect(page).to have_content('is too short (minimum is 8 characters)')
    end
  end

  context 'as logged in user' do
    as_user(:user)

    scenario 'i should be redirected to root_path from /auth' do
      visit auth_path
      expect(page).to have_content(select_profile_header)
    end
  end
end
