'use strict';
const capitalize = require('./capitalize');

/**
 * capitalize every word in a string
 * @param {string} str
 * @return {string}
 */
module.exports = function (str) {
  if (str && typeof str === 'string') {
    return str.replace(/\w\S*/g, function (word) {
      return capitalize(word);
    });
  }
};

module.exports.example = {
  code: '{{ capitalizeAll "foo bar" }}',
  result: '"Foo Bar"'
};
