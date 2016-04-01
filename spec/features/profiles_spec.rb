require 'rails_helper'

feature 'Profiles', js: true do

  context 'as logged in user' do
    as_user(:user)
    context 'without selected profile' do
      without_profile

      it 'should show list of my profiles if none is selected' do
        visit root_path
        expect(page).to have_content(current_user.profiles.first.name)
      end

      it 'should save profile selection' do
        my_profile = current_user.profiles.first
        visit root_path
        click_on my_profile.name
        visit root_path
        click_on_hamburger
        expect(page).to have_content(my_profile.name)
        expect(get_me_the_cookie(profile_cookie_name)).not_to be_nil
      end

      it 'should show profile selection at any address' do
        my_profile = current_user.profiles.first
        visit "/#{SecureRandom.hex(16)}"
        expect(page).to have_content(my_profile.name)
      end
    end

    context 'with selected profile' do
      with_profile(:profile)
      it 'should load selected profile from cookie' do
        visit root_path
        click_on_hamburger
        expect(page).to have_content('Switch profile')
      end
=begin
      it 'should allow me to switch to other profile' do
        other_profile = create(:profile, user_id: current_user.id)
        visit root_path
        click_on_hamburger
        click_link 'Switch profile'
        page.driver.debug
        click_on other_profile.name
        click_on_hamburger
        expect(page).to have_content(other_profile.name)
      end
=end
    end

  end
end
