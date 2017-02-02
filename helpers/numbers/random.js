'use strict';

/**
 * Returns a number within a specified range
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
module.exports = function (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

module.exports.exmaple = {
  code: '{{ random 1 7 }}',
  result: '3'
};