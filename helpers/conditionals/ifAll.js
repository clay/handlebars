const _ = require('lodash');

/**
 * block helper for checking if ALL arguments passed in are truthy
 * e.g. {{#ifAll foo bar baz}}all are truthy{{else}}not all are truthy{{/ifAll}}
 * @return {string}
 */
module.exports = function () {
  const conditionals = _.initial(arguments),
    options = _.last(arguments),
    taken = _.takeWhile(conditionals, c => !!c === true);

    // see if any of the conditionals are falsy without needing to
    // iterate through all of them

  if (taken.length === conditionals.length) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};
