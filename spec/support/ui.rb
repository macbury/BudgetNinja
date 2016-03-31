# Some simple helpers helping interaction with dynamic ui
module UISupport
  # Open hamburger and click logout
  def click_on_logout
    find('.hamburger', visible: false).click
    click_on('Logout')
  end
end
