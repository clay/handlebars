'use strict';
const _ = require('lodash');

/**
 * set data into current context
 * @param  {string} key _.set() key/path
 * @param  {*} val
 * @return {string} doesn't actually print anything
 */
module.exports = function (key, val) {
  _.set(this, key, val);

  return '';
};
