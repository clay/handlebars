const _ = require('lodash');

module.exports = function () {
  const conditionals = _.initial(arguments),
    options = _.last(arguments),
    falsyFound = _.find(conditionals, function (conditional) {
      // see if any of the conditionals are falsy without needing to
      // iterate through all of them (once we've found it)
      return !!conditional === false;
    });

  if (falsyFound !== undefined) {
    // at least one of the conditionals is falsy
    // so _.find returns quickly without iterating over all of them
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
};
