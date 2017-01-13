'use strict';
/**
 * straight passthrough to [striptags](https://www.npmjs.com/package/striptags)
 */
module.exports = require('striptags');

module.exports.example = {
  code: '{{ striptags "<p><b>Hello</b> <em>World!</em></p>" }}',
  result: 'Hello World!'
};
