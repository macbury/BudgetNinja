require 'rails_helper'

feature 'Index page', js: true do

  scenario 'is testing working' do
    visit root_path
    #expect(page).to have_content('Hello')
  end
end
