require 'rails_helper'

feature 'User sign in', js: true do
  let(:auth_path) { '/login' }
  let(:sign_in_button) { 'Sign in' }
  let(:logout_button) { 'Logout' }
  let(:email_label) { 'E-mail' }
  let(:password_label) { 'Password' }

  context 'as logged in user' do
    as_user(:user)

    scenario 'after i visit root path i should not be redirected to /auth' do
      visit root_path
      expect(page).to have_content(logout_button)
      expect(current_path).to eq(root_path)
    end

    scenario 'i should be able to sign out' do
      visit root_path
      click_on(logout_button)
      expect(page).to have_content(sign_in_button)
    end

    scenario 'i should be redirected to root_path from /auth' do
      visit auth_path
      expect(page).to have_content(logout_button)
    end
  end

  context 'as guest' do
    as_guest

    scenario 'after i visit root path i should be redirected to /auth' do
      visit root_path
      expect(page).to have_content(sign_in_button)
      expect(current_path).to eq(auth_path)
    end

    scenario 'after i visit /auth i should see sign in page' do
      visit auth_path
      expect(page).to have_content(sign_in_button)
      expect(page).to have_content(email_label)
      expect(page).to have_content(password_label)
    end

    scenario 'i should get errors for non existing user' do
      user = build(:user)
      visit auth_path

      fill_in email_label, with: user.email
      fill_in password_label, with: user.password

      click_on(sign_in_button)

      expect(page).to have_content('Invalid credentials.')
    end

    scenario 'i should be able to login' do
      user = create(:user)
      visit auth_path

      fill_in email_label, with: user.email
      fill_in password_label, with: user.password

      click_on(sign_in_button)
      expect(page).to have_content(logout_button)
      expect(current_path).to eq(root_path)
    end
  end

end
