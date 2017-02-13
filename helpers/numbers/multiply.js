'use strict';

/**
 * Return the product of `a` multiplied by `b`
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
module.exports = function (a, b) {
  return a * b;
};

module.exports.example = {
  code: '{{ multiply 10 10 }}',
  result: '100'
};
