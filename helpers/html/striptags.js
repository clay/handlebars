'use strict';
const striptags = require('striptags');

/**
 * straight passthrough to [striptags](https://www.npmjs.com/package/striptags)
 * (a value that isn't a string gives '', as it did in striptags 2; striptags 3 throws)
 * @param {string} html
 * @param {...*} rest the tags to keep, and what to replace the other tags with
 * @returns {string}
 */
module.exports = function (html, ...rest) {
  const last = rest[rest.length - 1];

  // Handlebars passes its options object as the last argument: it is not a tag, and not a replacement
  if (last !== null && typeof last === 'object' && 'hash' in last) {
    rest.pop();
  }

  return striptags(typeof html === 'string' ? html : '', ...rest);
};

module.exports.example = {
  code: '{{ striptags "<p><b>Hello</b> <em>World!</em></p>" }}',
  result: 'Hello World!'
};
