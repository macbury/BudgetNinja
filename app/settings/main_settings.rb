# This class describes main settings for application like app domain, email etc
class MainSettings < Settingslogic
  source Rails.root.join('config/application.yml')
  namespace Rails.env
end
