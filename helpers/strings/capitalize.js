'use strict';

/**
 * capitalize the first character in a string
 * @param {string} str
 * @return {string}
 */
module.exports = function (str) {
  if (str && typeof str === 'string') {
    return str.charAt(0).toUpperCase()
      + str.slice(1);
  }
};

module.exports.example = {
  code: '{{ capitalize "foo bar" }}',
  result: '"Foo bar"'
};
