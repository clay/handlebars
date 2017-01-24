'use strict';
const _ = require('lodash');

/**
 * converts things (usually strings) into numbers
 * _note:_ this is useful if you need to parse user input
 * @param  {number|string} x thing to convert into a number
 * @return {string}
 */
module.exports = function (x) {
  const num = parseInt(x, 10);

  if (!_.isNaN(num)) {
    return num;
  } else {
    throw new Error(`Cannot parse ${x} as number!`);
  }
};

module.exports.example = {
  code: '{{ num "123" }}',
  result: '123'
};
