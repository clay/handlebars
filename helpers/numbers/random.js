'use strict';

const _isFinite = require('lodash/isFinite');

/**
 * Returns a number within a specified range.
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
module.exports = function (min, max) {
  if (!_isFinite(min)) {
    throw new Error('Handlebars Helper "random" requires a minimum that is numeric and finite');
  }
  if (!_isFinite(max)) {
    throw new Error('Handlebars Helper "random" requires a maximum that is numeric and finite');
  }
  return min + Math.floor(Math.random() * (max - min + 1));
};

module.exports.exmaple = {
  code: '{{ random 1 7 }}',
  result: '3'
};
