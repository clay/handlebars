'use strict';

/**
 * Return the rounded value of `x`
 * @param {number|string} x
 * @returns {number}
 */
module.exports = function (x) {
  const currentNumber = parseFloat(x);

  if (isNaN(currentNumber)) {
    return x; // fail gracefully
  } else {
    return Math.round(x);
  }
};

module.exports.example = {
  code: '{{ round 1.5 }}',
  result: '2'
};
