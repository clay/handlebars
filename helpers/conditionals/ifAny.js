'use strict';

/**
 * block helper for checking if ANY arguments passed in are truthy
 * @return {string} calls block functions
 */
module.exports = function (...conditionals) {
  const options = conditionals.pop();

  return conditionals.some(Boolean) ? options.fn(this) : options.inverse(this);
};

module.exports.example = {
  code: `{{#ifAny foo bar baz}}
  at least one is truthy
{{else}}
  none are truthy
{{/ifAny}}`
};
