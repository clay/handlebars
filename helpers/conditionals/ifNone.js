'use strict';
const _initial = require('lodash/initial'),
  _last = require('lodash/last'),
  _find = require('lodash/find');

/**
 * block helper for checking if NO arguments passed in are truthy
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

  if (truthyFound !== undefined) {
    // at least one of the conditionals is truthy
    // so _find returns quickly without iterating over all of them
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
};

module.exports.example = {
  code: `{{#ifNone foo bar baz}}
  all are falsy
{{else}}
  not all are falsy
{{/ifNone}}`
};
