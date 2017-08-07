'use strict';

/**
 * add ordinal after a number
 * e.g. `1` → `1st`, `2` → `2nd`, `3` → `3rd`
 * @param  {number|string} i number to add ordinal after
 * @return {string}
 */
module.exports = function (i) {
  const j = i % 10,
    k = i % 100;

  // if no value is supplied return an empty string
  if (i == '') {
    return '';
  }
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
};

module.exports.example = {
  code: '{{ addOrdinalSuffix 1 }}',
  result: '1st'
};
