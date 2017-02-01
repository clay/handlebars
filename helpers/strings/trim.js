'use strict';

/**
 * trim leading and trailing whitespace from a string
 * @param  {string} str
 * @return {string}
 */
module.exports = function (str) {
  return typeof str === 'string' ? str.trim() : '';
};

module.exports.example = {
  code: '{{ trim "   Foo   " }}',
  result: '"Foo"'
};
