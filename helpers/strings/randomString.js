'use strict';
const randomstring = require('randomstring'),
  _ = require('lodash');

/**
 * generatea random string
 * e.g. `greatest-hit-` → `greatest-hit-noctz56h`
 * note: allows passing length=x to generate strings of different lengths
 * @param  {string} [prefix]
 * @param {object} [options]
 * @return {string}
 */
module.exports = function (prefix, options) {
  if (options === undefined) {
    // no prefix defined, options is the first arg
    options = prefix;
    prefix = '';
  } else if (!_.isString(prefix)) {
    prefix = '';
  }

  // default to 8 chars, but allow passing in any length
  return prefix + randomstring.generate(options.hash.characters || 8);
};
