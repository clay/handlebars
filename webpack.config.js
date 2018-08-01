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
        presets: ['es2015'],
      }
    }, {
      // allows us to require() partials
      test: /\.hbs$/,
      loader: 'handlebars-template-loader',
      query: {
        attributes: []
      }
    }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.optimize.UglifyJsPlugin({ output: {inline_script: true} }),
    new LodashModuleReplacementPlugin({
      shorthands: true, // allow _.map(collection, prop)
      collections: true, // allow objects in collection methods
      deburring: true, // remove diacritical marks
      unicode: true, // support unicode
      coercions: true, // allow coercions
      flattening: true, // allow flattening methods
      paths: true, // allow deep _.get, _.set, _.has
      // note: we're explicitly not allowing chaining, cloning, memoizing, or currying
    })
  ]
};
