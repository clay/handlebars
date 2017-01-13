'use strict';
/**
 * compare the modulo of two values to a third value
 * @param  {number} dividend
 * @param  {number} divisor
 * @param  {number} remainder
 * @param  {object} [options]
 * @return {string} if inline, otherwise calls block functions
 */
module.exports = function (dividend, divisor, remainder, options) {
  var result = dividend % divisor;

  // if used as a block helper, this will have options.fn and options.inverse
  // if used inline, simply return true/emptystring
  if (result === remainder) {
    return options.fn ? options.fn(this) : true;
  } else {
    return options.inverse ? options.inverse(this) : '';
  }
};

module.exports.example = {
  code: '{{modulo 3 2 1}}',
  result: 'true'
};
