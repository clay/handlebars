const _ = require('lodash');

module.exports = function (components) {
  var limitReached = false;

  return _.filter(components, function (item) {
    if (item.displaySelf && !limitReached) {
      limitReached = true;
      return item;
    }
  });
};
