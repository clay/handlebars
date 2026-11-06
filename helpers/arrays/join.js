'use strict';

/**
 * join all elements of array into a string, optionally using a given separator
 * @param {array} array
 * @param {string} [sep] the separator to use (defaults to ', ')
 * @return {string}
 */
module.exports = function (array, sep) {
  if (!Array.isArray(array)) {
    return '';
  }

  return array.join(typeof sep !== 'string' ? ', ' : sep);
};

module.exports.example = {
  code: '{{ join ["a", "b", "c"] "-" }}',
  result: '"a-b-c"'
};
