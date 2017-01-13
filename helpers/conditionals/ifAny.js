'use strict';
const _ = require('lodash');

/**
 * block helper for checking if ANY arguments passed in are truthy
 * @return {string} calls block functions
 */
module.exports = function () {
  const conditionals = _.initial(arguments),
    options = _.last(arguments),
    truthyFound = _.find(conditionals, function (conditional) {
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
