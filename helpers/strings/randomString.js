'use strict';
const _ = require('lodash'),
  randomstring = require('randomstring');

/**
 * generatea random string
 * e.g. `greatest-hit-` → `greatest-hit-noctz56h`
 * @param  {string} [prefix]
 * @return {string}
 */
module.exports = function (prefix) {
  if (!_.isString(prefix)) {
    prefix = '';
  }

  return prefix + randomstring.generate(8);
};
