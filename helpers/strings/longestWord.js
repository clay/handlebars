'use strict';
const _isString = require('lodash/isString'),
  _words = require('lodash/words');

/**
 * returns the number of characters in the longest word of a string. Punctuation is NOT ignored.
 * @param  {string} str string to search through
 * @return {number} of letters in the longest word
 */
module.exports = function (str) {
  if (!_isString(str)) {
    throw new Error('longestWord requires a string argument!');
  }

  return _words(str).reduce(function (prev, curr) {
    if (curr.length > prev.length) {
      return curr;
    } else {
      return prev;
    }
  }, '').length;
};

module.exports.example = {
  code: '{{ longestWord "Foo Ba b" }}',
  result: '3'
};
