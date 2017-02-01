'use strict';

/**
 * Return the product of `a` plus `b`
 * @param  {number} a
 * @param {number} b
 * @return {number}
 */
module.exports = function (a, b) {
  return parseInt(a, 10) + parseInt(b, 10);
};

module.exports.example = {
  code: '{{ add 3 2 }}',
  result: '5'
};
