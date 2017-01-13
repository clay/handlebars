'use strict';
const _ = require('lodash');

/**
 * set data into current context
 * _note:_ doesn't return anything
 * @param  {string} key `_.set()` key/path
 * @param  {*} val value to set
 */
module.exports = function (key, val) {
  _.set(this, key, val);
};

module.exports.example = {
  code: '{{ set "a.b.c" "abc" }}{{ a.b.c }}',
  result: '"abc"'
};
