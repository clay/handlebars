'use strict';
const randomstring = require('randomstring'),
  _ = require('lodash');

/**
 * generate a random string
 * _note:_ by default it generates an 8-character string
 * @param  {string} [prefix] string to append random stuff to
 * @param {object} [options]
 * @param {number} [options.hash.characters] generate string of a custom length
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

module.exports.example = {
  code: '{{ randomString "greatest-hit-" characters=3 }}',
  result: '"greatest-hit-z56"'
};
