'use strict';

const SUFFIXES = { 1: 'st', 2: 'nd', 3: 'rd' };

/**
 * add ordinal after a number
 * e.g. `1` → `1st`, `2` → `2nd`, `3` → `3rd`
 * @param  {number|string} num number to add ordinal after
 * @return {string}
 */
module.exports = function (num) {
  const lastTwoDigits = num % 100;

  // if no number is supplied, pass through string
  if (num === '' || isNaN(num)) { // will check numbers and (numbers in) strings
    return String(num); // will convert to a string if it's a different type
  }

  // 11th, 12th and 13th are the exceptions to 1st, 2nd and 3rd
  return `${num}${lastTwoDigits >= 11 && lastTwoDigits <= 13 ? 'th' : SUFFIXES[num % 10] || 'th'}`;
};

module.exports.example = {
  code: '{{ addOrdinalSuffix 1 }}',
  result: '1st'
};
