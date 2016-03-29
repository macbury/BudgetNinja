# Helpers for webpack integration
module WebpackDevHelper
  # Renders all style and js tags
  def webpack_assets_tag(source)
    assets = webpack_asset_paths(source)

    assets.map do |asset_name|
      if File.extname(asset_name) == '.js'
        javascript_include_tag(asset_name)
      else
        stylesheet_link_tag(asset_name)
      end
    end.join("\n").html_safe
  end

  # Render script with webpack dev server when enabled
  def webpack_dev_server_tag
    if Rails.configuration.webpack.dev_server.enabled
      javascript_include_tag "http://#{Rails.configuration.webpack.dev_server.host}:#{Rails.configuration.webpack.dev_server.port}/webpack-dev-server.js"
    end
  end
end
