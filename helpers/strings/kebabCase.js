'use strict';
const _ = require('lodash');

/**
 * straight passthrough to [`_.kebabCase`](https://lodash.com/docs/4.17.4#kebabCase)
 */
module.exports = _.kebabCase;

module.exports.example = {
  code: '{{ kebabCase "Foo Bar Baz" }}',
  result: '"foo-bar-baz"'
};
