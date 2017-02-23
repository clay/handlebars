'use strict';
const _ = require('lodash');

/**
 * block helper for checking that NOT ALL arguments passed in are truthy
 * @return {string} calls block functions
 */
module.exports = function () {
  const conditionals = _.initial(arguments),
    options = _.last(arguments),
    taken = _.takeWhile(conditionals, c => !!c === true);

    // see if any of the conditionals are falsy without needing to
    // iterate through all of them

  if (taken.length === conditionals.length) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
};

module.exports.example = {
  code: `{{#unlessAll foo bar baz}}
  not all are truthy
{{else}}
  all are truthy
{{/ifAll}}`
};
