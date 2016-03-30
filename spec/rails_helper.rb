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
    js_errors: true,
    window_size: [1920, 1080],
    phantomjs_logger: Rails.logger,
    inspector: true
  })
end

Capybara.javascript_driver = :poltergeist
Capybara.default_driver    = :poltergeist
Warden.test_mode!

Dir[Rails.root.join('spec/support/**/*.rb')].each {|f| require f}
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
  config.include ShowMeTheCookies, type: :feature
  config.include FactoryGirl::Syntax::Methods
  config.extend FeatureDevise, type: :feature
  config.extend ControllerDevise, type: :controller
  config.include(ScreenshotSupport, type: :feature)

  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!
  config.order = 'random'
  config.filter_rails_from_backtrace!

  config.before(:suite) do
    WebpackSupport.start! if ENV['CI']
    Warden.test_reset!
    ScreenshotSupport.clean!
  end

  config.after(:suite) do
    WebpackSupport.stop!
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
    DatabaseCleaner.clean
    DatabaseCleaner.strategy = :truncation
    DatabaseCleaner.start
    if example.metadata[:type] == :feature
      clear_emails
    end
  end
end
