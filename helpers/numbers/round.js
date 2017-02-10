'use strict';

/**
 * Return the rounded value of `x`, optionally always rounding up or down
 * @param {number|string} x
 * @param {string} [direction] always round `x` up or down, expects values 'up' or 'down', otherwise just round
 * @returns {number}
 */
module.exports = function (x, direction) {
  const currentNumber = parseFloat(x);

  if (isNaN(currentNumber)) {
    return x; // fail gracefully
  }

  switch (direction) {
    case 'up':
      return Math.ceil(x);
    case 'down':
      return Math.floor(x);
    default:
      return Math.round(x);
  }
};

module.exports.example = {
  code: '{{ round 1.5 "down" }}',
  result: '1'
};
