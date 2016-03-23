require 'rails_helper'

feature 'User sign in', js: true do
  let(:auth_path) { '/auth' }
  let(:sign_in_button) { 'Sign in' }
  let(:email_label) { 'E-mail' }
  let(:password_label) { 'Password' }

  context 'as guest' do
    scenario 'after i visit root path i should be redirected to /auth' do
      visit root_path
      expect(current_path).to eq(auth_path)
      expect(page).to have_content(sign_in_button)
    end

    scenario 'after i visit /auth i should see sign in page' do
      visit auth_path
      expect(page).to have_content(sign_in_button)
      expect(page).to have_content(email_label)
      expect(page).to have_content(password_label)
    end
  end

end
