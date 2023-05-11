'use strict';
const _initial = require('lodash/initial'),
  _last = require('lodash/last'),
  _takeWhile = require('lodash/takeWhile');

/**
 * helper for checking if ALL arguments passed in are truthy
 * _note:_ this can be used as a block _or_ inline helper
 * @return {string} calls block functions
 */
module.exports = function () {
  const conditionals = _initial(arguments),
    options = _last(arguments),
    taken = _takeWhile(conditionals, c => !!c === true);

  // see if any of the conditionals are falsy without needing to
  // iterate through all of them
  if (taken.length === conditionals.length) {
    return options.fn ? options.fn(this) : true;
  } else {
    return options.inverse ? options.inverse(this) : false;
  }
};

module.exports.example = {
  code: `{{#ifAll foo bar baz}}
  all are truthy
{{else}}
  not all are truthy
{{/ifAll}}`
};