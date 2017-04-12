'use strict';
const _isArray = require('lodash/isArray');

/**
 * join all elements of array into a string, optionally using a given separator
 * @param {array} array
 * @param {string} [sep] the separator to use (defaults to ', ')
 * @return {string}
 */
module.exports = function (array, sep) {
  if (!_isArray(array)) {
    return '';
  }

  sep = typeof sep !== 'string' ? ', ' : sep;
  return array.join(sep);
};

module.exports.example = {
  code: '{{ join ["a", "b", "c"] "-" }}',
  result: '"a-b-c"'
};
