'use strict';

/**
 * straight passthrough to [`kebabCase`](https://lodash.com/docs/4.17.4#kebabCase)
 * _note:_ words are told apart the way lodash does, so camelCase, numbers and accents are handled too
 * @param {string} [str]
 * @return {string}
 */
module.exports = function (str) {
  // lodash is loaded the first time this helper runs: nothing else in clayhandlebars needs it
  return require('lodash/kebabCase')(str);
};

module.exports.example = {
  code: '{{ kebabCase "Foo Bar Baz" }}',
  result: '"foo-bar-baz"'
};
