'use strict';
const _kebabCase = require('lodash/kebabCase');

/**
 * straight passthrough to [`_kebabCase`](https://lodash.com/docs/4.17.4#kebabCase)
 */
module.exports = _kebabCase;

module.exports.example = {
  code: '{{ kebabCase "Foo Bar Baz" }}',
  result: '"foo-bar-baz"'
};
