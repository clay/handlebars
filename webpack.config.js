'use strict';
const path = require('path'),
  webpack = require('webpack'),
  LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    browser: './client.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'nymag-handlebars',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        plugins: ['lodash'],
        presets: ['es2015'],
      }
    }, {
      // allows us to require() partials
      test: /\.hbs$/,
      loader: 'handlebars-template-loader'
    }]
  },
  plugins: [
    new LodashModuleReplacementPlugin,
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.optimize.UglifyJsPlugin,
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
  ]
};
