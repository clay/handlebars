'use strict';
const _isArray = require('lodash/isArray'),
  _map = require('lodash/map'),
  _isString = require('lodash/isString');

/**
 * map through array, call function on each item
 * @param {array|string} array of items to iterate through
 * @param {function} fn to run on each item
 * @return {array}
 */
module.exports = function (array, fn) {
  if (_isArray(array)) {
    return _map(array, fn);
  } else if (_isString(array)) {
    return _map(array.split(''), fn);
  } else {
    return [];
  }
};

module.exports.example = {
  code: '{{ join (map [{ a: "1" }, { a: "2" }] (getProp "a")) }}',
  result: '"1, 2"'
};
