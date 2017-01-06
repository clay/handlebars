const _ = require('lodash');

/**
 * block helper for checking if NO arguments passed in are truthy
 * e.g. {{#ifNone foo bar baz}}all are falsy{{else}}not all are falsy{{/ifAll}}
 * @return {string}
 */
module.exports = function () {
  const conditionals = _.initial(arguments),
    options = _.last(arguments),
    truthyFound = _.find(conditionals, function (conditional) {
      // see if any of the conditionals are truthy without needing to
      // iterate through all of them (once we've found it)
      return !!conditional === true;
    });

  if (truthyFound !== undefined) {
    // at least one of the conditionals is truthy
    // so _.find returns quickly without iterating over all of them
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
};
