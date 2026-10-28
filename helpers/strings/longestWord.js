'use strict';
/**
 * returns the number of characters in the longest word of a string. Punctuation is NOT ignored.
 * @param  {string} str string to search through
 * @return {number} of letters in the longest word
 */
module.exports = function (str) {
  if (!(typeof str === 'string' || str instanceof String)) {
    throw new Error('longestWord requires a string argument!');
  }

  // lodash is loaded the first time this helper runs: it tells words apart (camelCase, numbers, accents) better than a regex can
  return require('lodash/words')(str).reduce(function (prev, curr) {
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
