'use strict';
const comma = require('comma-it');

/**
 * add commas to numbers.
 * _note:_ this overrides handlebars-helpers' `addCommas` helper because we want to preserve zeroes in decimals (for money)
 * e.g. `1234.50` → `1,234.50` instead of `1,234.5`
 * _note:_ decimals are only preserved if passed in as a string (they don't exist in js numbers)
 * @param  {number|string} num
 * @return {string}
 */
module.exports = function (num) {
  const str = num.toString(),
    precision = str.split('.') && str.split('.')[1] && str.split('.')[1].length || 0;

  // if the number has a decimal, set the precision to the amount of decimal places,
  // otherwise set the precision to zero (for intergers)

  return comma(str, { precision: precision, thousandSeperator: ',', decimalSeperator: '.' });
};

module.exports.example = {
  code: '{{ addCommas "1234.50" }}',
  result: '"1,234.50"'
};
