require 'rails_helper'

feature 'Profiles', js: true do
  context 'as logged in user' do
    as_user(:user)
    let(:my_profile) { current_user.profiles.first }
    it 'should show list of my profiles if none is selected' do
      visit root_path
      expect(page).to have_content(my_profile.name)
    end

    it 'should save profile selection' do
      visit root_path
      click_on my_profile.name
      visit root_path
      expect(page).not_to have_content(my_profile.name)
    end

    it 'should show profile selection at any address' do
      visit "/#{SecureRandom.hex(16)}"
      expect(page).to have_content(my_profile.name)
    end
  end
end
