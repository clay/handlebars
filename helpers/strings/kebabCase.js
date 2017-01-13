'use strict';
const _ = require('lodash');

/**
 * straight passthrough to `_.kebabCase`
 */
module.exports = _.kebabCase;

module.exports.example = {
  code: '{{ kebabCase "Foo Bar Baz" }}',
  result: '"foo-bar-baz"'
};
