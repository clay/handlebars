'use strict';

/**
 * lower cases a string
 * _note:_ non-strings will return emptystring
 * @param  {string} str
 * @return {string} lower cased
 */
module.exports = function (str) {
  if (typeof str === 'string') {
    return str.toLowerCase();
  }
};

module.exports.example = {
  code: '{{ lowercase "Foo" }}',
  result: '"foo"'
};
