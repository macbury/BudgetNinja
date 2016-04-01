# Some simple helpers helping interaction with dynamic ui
module UISupport

  # Clicks on hamburger
  def click_on_hamburger
    find('.hamburger', visible: false).click
  end

  # Open hamburger and click logout
  def click_on_logout
    click_on_hamburger
    click_on('Logout')
  end
end
