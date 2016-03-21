// Example webpack configuration with asset fingerprinting in production.
'use strict';

var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// must match config.webpack.dev_server.port
var devServerPort = 3808;

// set TARGET=production on the environment to add asset fingerprints
var production  = process.env.TARGET === 'production' || process.env.TARGET === 'test';
var development = !production;
var applicationEntry = [];

if (development) {
  applicationEntry.push('webpack-dev-server/client?http://budget-ninja.local:3808/');
  applicationEntry.push('webpack/hot/only-dev-server');
}

applicationEntry.push('./webpack/application.js');

var config = {
  entry: {
    'application': applicationEntry
  },

  output: {
    // Build assets directly in to public/webpack/, let webpack know
    // that all webpacked assets start with webpack/

    // must match config.webpack.output_dir
    path: path.join(__dirname, '..', 'public', 'webpack'),
    publicPath: '/webpack/',

    filename: production ? '[name]-[chunkhash].js' : '[name].js'
  },

  resolve: {
    root: path.join(__dirname, '..', 'webpack')
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      // prepare source map for css
      { test: /\.scss$/, loader: "style!css?sourceMap&modules!sass?sourceMap" },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      // Load font for bootstrap sass
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },

  plugins: [
    // must match config.webpack.manifest_filename
    new StatsPlugin('manifest.json', {
      // We only need assetsByChunkName
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true
    })
  ]
};

if (production) {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  );
} else {
  config.devServer = {
    port: devServerPort,
    headers: { 'Access-Control-Allow-Credentials': 'true' , 'Access-Control-Allow-Origin': 'http://budget-ninja.local' }
  };
  config.output.publicPath = '//0.0.0.0:' + devServerPort + '/webpack/';
  // Source maps
  config.devtool = 'source-map';
}

module.exports = config;
