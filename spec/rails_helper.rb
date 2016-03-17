# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'
require 'capybara/rspec'
require 'capybara/poltergeist'
require 'capybara/email/rspec'
require 'factory_girl_rails'

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, {
    js_errors: false,
    window_size: [1920, 1080]
  })
end

Capybara.javascript_driver = :poltergeist
Capybara.default_driver    = :poltergeist
Capybara.server_port       = 3001
Capybara.app_host          = 'http://localhost:3001'

Warden.test_mode!

Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}
ActiveRecord::Migration.maintain_test_schema!

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :active_record
    with.library :rails
  end
end

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.include Rails.application.routes.url_helpers, type: :feature
  config.include Warden::Test::Helpers, type: :feature
  config.include Devise::TestHelpers, type: :controller
  config.include FactoryGirl::Syntax::Methods
  config.include(ScreenshotSupport, type: :feature)
  
  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!

  config.filter_rails_from_backtrace!

  config.before(:suite) do
    Warden.test_reset!
    ScreenshotSupport.clean!
  end

  config.around(:each) do |example|
    ActionMailer::Base.deliveries.clear
    example.run
  end

  config.after(:each) do |example|
    Warden.test_reset!
    if example.metadata[:type] == :feature
      if example.exception.present?
        ScreenshotSupport.failure!(page, example)
      else
        ScreenshotSupport.success!(page, example)
      end
    end
  end

  config.before(:each) do |example|
    DatabaseCleaner.strategy = :truncation
    DatabaseCleaner.start
    if example.metadata[:type] == :feature
      clear_emails
    end
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end
end
