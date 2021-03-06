'use strict';

/**
 * converts things (usually strings) into numbers
 * _note:_ this is useful if you need to parse user input
 * @param  {number|string} x thing to convert into a number
 * @return {string}
 */
module.exports = function (x) {
  return parseInt(x, 10);
};

module.exports.example = {
  code: '{{ num "123" }}',
  result: '123'
};
