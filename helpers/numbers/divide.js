'use strict';

/**
 * Return the result of `a` divided by `b`
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
module.exports = function (a, b) {
  return a / b;
};

module.exports.example = {
  code: '{{ divide 100 4 }}',
  result: '25'
};
