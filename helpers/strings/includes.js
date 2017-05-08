'use strict';
/**
 * check if a substring exist within a string. This is very similiar to the
 * indexOf helper, except it uses String.prototype.includes() and returns a
 * boolean.
 *
 * @param  {string} string
 * @param  {string} substring
 * @return {boolean}
 */
module.exports = function (string, substring) {
  if (!string || typeof string !== 'string' || typeof substring !== 'string') {
    throw new Error('includes needs a string to search');
  } else {
    // Handlebars returns booleans as strings, so only return a value if the
    // substring is found
    if (string.includes(substring)) {
      return true;
    }
  }
};

module.exports.example = {
  code: '{{ includes "hello world" "world" }}',
  result: 'true'
};
