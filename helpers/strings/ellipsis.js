'use strict';

/**
 * If a string is over a given length, truncate and append an ellipsis character to the end.
 * @param {string} str to shorten
 * @param {number} len desired length
 * @return {string}
 */
module.exports = function (str, len) {
  if (str && typeof str === 'string') {
    return str.trim().length > len ? str.trim().slice(0, len).trim() + '…' : str.trim();
  }
};

module.exports.example = {
  code: '{{ ellipsis "Foo Bar" 4 }}',
  result: '"Foo…"'
};
