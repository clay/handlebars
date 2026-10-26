'use strict';
const striptags = require('striptags');

/**
 * straight passthrough to [striptags](https://www.npmjs.com/package/striptags)
 * (a value that isn't a string gives '', as it did in striptags 2; striptags 3 throws)
 * @param {string} html
 * @param {...*} rest allowed tags and tag replacement
 * @returns {string}
 */
module.exports = function (html, ...rest) {
  return striptags(typeof html === 'string' ? html : '', ...rest);
};

module.exports.example = {
  code: '{{ striptags "<p><b>Hello</b> <em>World!</em></p>" }}',
  result: 'Hello World!'
};
