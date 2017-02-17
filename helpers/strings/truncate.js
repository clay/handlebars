'use strict';

const _ = require('lodash');

/**
 * If a string is over a given length, truncate and append an ellipsis character to the end.
 * @param {string} str to shorten
 * @param {number} len desired length
 * @param {object} options
 * @param {string} [options.hash.suffix] to append to truncated string, defaulting to an ellipsis
 * @return {string}
 */
module.exports = function (str, len, options) {
  var suffix = options === undefined || !_.isString(options.hash.suffix) ? '…' : options.hash.suffix;

  if (str && typeof str === 'string') {
    return str.trim().length > len ? str.trim().slice(0, len).trim() + suffix : str.trim();
  }
};

module.exports.example = {
  code: '{{ truncate "Foo Bar" 4 }}',
  result: '"Foo…"'
};
