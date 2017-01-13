'use strict';
const _ = require('lodash');

/**
 * Return the first component (from a list of components) with a truthy displaySelf property. Used by Spaces.
 * @param  {array} components with displaySelf properties
 * @return {object} first component with displaySelf: true
 */
module.exports = function (components) {
  var limitReached = false;

  return _.filter(components, function (item) {
    if (item.displaySelf && !limitReached) {
      limitReached = true;
      return item;
    }
  });
};

module.exports.example = {
  code: '{{> component-list (displaySelf content) }}'
};
