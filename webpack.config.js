'use strict';
const path = require('path');

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
      loader: 'handlebars-template-loader'
    }]
  }
};
