'use strict';
const _ = require('lodash');

/**
 * returns the number of characters in the longest word of a string. Punctuation is NOT ignored.
 * @param  {string} str string to search through
 * @return {number} of letters in the longest word
 */
module.exports = function (str) {
  if (!_.isString(str)) {
    throw new Error('longestWord requires a string argument!');
  }

  return _.words(str).reduce(function (prev, curr) {
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
