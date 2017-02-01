'use strict';

/**
 * Return the product of `a` minus `b`
 * @param  {number} a
 * @param {number} b
 * @return {number}
 */
module.exports = function (a, b) {
  return a - b;
};

module.exports.example = {
  code: '{{ subtract 3 2 }}',
  result: '1'
};
