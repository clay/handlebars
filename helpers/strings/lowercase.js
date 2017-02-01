'use strict';
const _ = require('lodash');

/**
 * lower cases a string
 * _note:_ non-strings will return emptystring
 * @param  {string} str
 * @return {string} lower cased
 */
module.exports = function (str) {
  return _.isString(str) ? str.toLowerCase() : '';
};
