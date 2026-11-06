'use strict';
const { set } = require('../../lib/path');

/**
 * set data into current context or other optional context/object
 * _note:_ doesn't return anything
 * @param  {object} [obj] context or object for storing data beyond current context
 * @param  {string} key `set()` key/path, like `"a"` or `"a.b[0].c"`
 * @param  {*} val value to set
 */
module.exports = function (obj, key, val) {

  if (typeof obj === 'string' || obj instanceof String) {
    val = key;
    key = obj;
    obj = this;
  }

  set(obj, key, val);
};

module.exports.example = {
  code: '{{ set "a.b.c" "abc" }}{{ a.b.c }}',
  result: '"abc"'
};
