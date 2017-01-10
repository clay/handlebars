'use strict';
/**
 * convert number to shorthand
 * e.g. 1000 → 1k
 * @param  {number|string} x
 * @return {string}
 */
module.exports = function (x) {
  const currentNumber = parseInt(x, 10); // always specify radix with arbitrary input

  if (isNaN(currentNumber)) {
    return x; // fail gracefully
  } else if (currentNumber > 999) {
    const kResult = (currentNumber / 1000).toFixed(1);

    if (parseFloat(kResult) === parseInt(kResult, 10)) {
      return parseInt(kResult, 10) + 'k';
    } else {
      return kResult + 'k';
    }
  } else {
    // number is less than 1000, so no conversion necessary
    return x;
  }
};
