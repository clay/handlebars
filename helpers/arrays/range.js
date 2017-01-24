'use strict';
const _ = require('lodash');

/**
 * return an array of numbers, in order
 * _note:_ can be used inline or as a block helper (will iterate through all numbers)
 * @param  {number} [start] on this number (defaults to 0)
 * @param  {number} end  on this number
 * @param {object} [options]
 * @return {array}
 */
module.exports = function (start, end, options) {
  let range;

  if (!_.isNumber(end)) {
    // if they only specify one argument, start from 0
    options = end;
    end = start;
    start = 0;
  }

  range = _.range(start, end);

  if (options && options.fn) {
    // block-level, iterate through the range!
    // pass each number as the context to options.fn
    return range.map(options.fn).join('');
  } else {
    return range;
  }
};

module.exports.example = {
  code: '{{#range 1 5}}{{ this }}{{/range}}',
  result: '1234'
};
