'use strict';

/**
 * block helper for checking if ALL arguments passed in are truthy
 * @return {string} calls block functions
 */
module.exports = function (...conditionals) {
  const options = conditionals.pop();

  return conditionals.every(Boolean) ? options.fn(this) : options.inverse(this);
};

module.exports.example = {
  code: `{{#ifAll foo bar baz}}
  all are truthy
{{else}}
  not all are truthy
{{/ifAll}}`
};
