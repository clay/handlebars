'use strict';

/**
 * block helper for checking if NO arguments passed in are truthy
 * @return {string} calls block functions
 */
module.exports = function (...conditionals) {
  const options = conditionals.pop();

  return conditionals.some(Boolean) ? options.inverse(this) : options.fn(this);
};

module.exports.example = {
  code: `{{#ifNone foo bar baz}}
  all are falsy
{{else}}
  not all are falsy
{{/ifNone}}`
};
