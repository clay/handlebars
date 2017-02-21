'use strict';
const _ = require('lodash');

/**
 * set data into current context or other optional context/object
 * _note:_ doesn't return anything
 * @param  {object} [obj] context or object for storing data beyond current context
 * @param  {string} key `_.set()` key/path
 * @param  {*} val value to set
 */
module.exports = function (obj, key, val) {

  if (_.isString(obj)) {
    val = key;
    key = obj;
    obj = this;
  }

  _.set(obj, key, val);
};

module.exports.example = {
  code: '{{ set "a.b.c" "abc" }}{{ a.b.c }}',
  result: '"abc"'
};
