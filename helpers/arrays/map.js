'use strict';
const _ = require('lodash');

/**
 * map through array, call function on each item
 * @param {array|string} array of items to iterate through
 * @param {function} fn to run on each item
 * @return {array}
 */
module.exports = function (array, fn) {
  if (_.isArray(array)) {
    return _.map(array, fn);
  } else if (_.isString(array)) {
    return _.map(array.split(''), fn);
  } else {
    return [];
  }
};

module.exports.example = {
  code: '{{ join (map [{ a: "1" }, { a: "2" }] (getProp "a")) }}',
  result: '"1, 2"'
};
