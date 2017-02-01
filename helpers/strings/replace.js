'use strict';

/**
 * replace all occurrences of `a` with `b`
 * _note:_ this does simple string replacement, not regex
 * @param {string} str to replace inside
 * @param {string} a to replace
 * @param {string} b the replacement
 * @returns {string}
 */
module.exports = function (str, a, b) {
  if (str && typeof str === 'string') {
    if (!a || typeof a !== 'string') return str;
    if (!b || typeof b !== 'string') b = '';
    return str.split(a).join(b);
  }
};

module.exports.example = {
  code: '{{ replace "Foo Bar" "Bar" "Baz" }}',
  result: '"Foo Baz"'
};
