'use strict';

/**
 * block helper for checking that NOT ALL arguments passed in are truthy
 * _note:_ this is the inverse of the ifAll helper
 * @return {string} calls block functions
 */
module.exports = function (...conditionals) {
  const options = conditionals.pop();

  return conditionals.every(Boolean) ? options.inverse(this) : options.fn(this);
};

module.exports.example = {
  code: `{{#unlessAll foo bar baz}}
  not all are truthy
{{else}}
  all are truthy
{{/unlessAll}}`
};
