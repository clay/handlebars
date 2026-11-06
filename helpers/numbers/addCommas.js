'use strict';

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
    [whole, decimals] = str.split('.');
  let sign = '', digits = whole;

  if (str.length === 0) {
    return '0.00';
  }

  if (digits.startsWith('-')) {
    sign = '-';
    digits = digits.slice(1);
  }

  // groups of three digits, counted from the end of the whole part
  digits = digits.split('').reverse().join('').replace(/(\d{3}(?!$))/g, '$1,').split('').reverse().join('');

  return sign + digits + (decimals ? '.' + decimals : '');
};

module.exports.example = {
  code: '{{ addCommas "1234.50" }}',
  result: '"1,234.50"'
};
