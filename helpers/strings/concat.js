'use strict';

/**
 * concatenate any number of strings
 * @return {string} concatenated string
 */
module.exports = function () {
  let arg = Array.prototype.slice.call(arguments, 0);

  arg.pop();
  return arg.join('');
};

module.exports.example = {
  code: '{{ concat "Foo" "Bar" "Baz" }}',
  result: '"FooBarBaz"'
};
