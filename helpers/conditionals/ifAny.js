'use strict';
const _initial = require('lodash/initial'),
  _last = require('lodash/last'),
  _find = require('lodash/find');

/**
 * helper for checking if ANY arguments passed in are truthy
 * _note:_ this can be used as a block _or_ inline helper
 * @return {string} calls block functions
 */
module.exports = function () {
  const conditionals = _initial(arguments),
    options = _last(arguments),
    truthyFound = _find(conditionals, function (conditional) {
      // see if any of the conditionals are truthy without needing to
      // iterate through all of them (once we've found it)
      return !!conditional === true;
    });

  if (truthyFound) {
    // at least one of the conditionals is truthy
    return options.fn ? options.fn(this) : true;
  } else {
    return options.inverse ? options.inverse(this) : false;
  }
};

module.exports.example = {
  code: `{{#ifAny foo bar baz}}
  at least one is truthy
{{else}}
  none are truthy
{{/ifAny}}`
};