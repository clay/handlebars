'use strict';
const _initial = require('lodash/initial'),
  _last = require('lodash/last'),
  _find = require('lodash/find');

/**
 * block helper for checking if ANY arguments passed in are truthy
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
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};

module.exports.example = {
  code: `{{#ifAny foo bar baz}}
  at least one is truthy
{{else}}
  none are truthy
{{/ifAny}}`
};
