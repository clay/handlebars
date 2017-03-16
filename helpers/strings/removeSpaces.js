'use strict';

/**
 * remove spaces, used by in-page `id` attributes so we can do in-page links
 * (per the HTML spec IDs cannot have spaces)
 * @param {string} str
 * @returns {string}
 */
module.exports = function (str) {
  if (str && typeof str === 'string') {
    return str.replace(/\s/g, '');
  }
};

module.exports.example = {
  code: '{{ removeSpaces "Foo Bar" }}',
  result: '"FooBar"'
};
