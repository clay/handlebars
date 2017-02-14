'use strict';
const _ = require('lodash');

/**
 * set data into an object for manipulation across contexts
 * _note:_ doesn't return anything
 * @param   {object} obj host object
 * @param  {string} key `_.set()` key/path
 * @param  {*} val value to set
 */
module.exports = function (obj, key, val) {
  _.set(obj, key, val);
};

module.exports.example = {
  code: '{{ set someObj "foo" "bar" }}{{ someObj.foo }}',
  result: '"bar"'
};
