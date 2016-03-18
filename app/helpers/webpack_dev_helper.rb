# Helpers for webpack integration
module WebpackDevHelper
  # Render script with webpack dev server when enabled
  def webpack_dev_server_tag
    if Rails.configuration.webpack.dev_server.enabled
      javascript_include_tag "//#{Rails.configuration.webpack.dev_server.host}:#{Rails.configuration.webpack.dev_server.port}/webpack-dev-server.js"
    end
  end
end
