'use strict';

/**
 * concatenate any number of strings
 * @return {string} concatenated string
 */
module.exports = function (...args) {
  args.pop(); // Handlebars' options object

  return args.join('');
};

module.exports.example = {
  code: '{{ concat "Foo" "Bar" "Baz" }}',
  result: '"FooBarBaz"'
};
