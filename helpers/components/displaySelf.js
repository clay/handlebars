'use strict';
const { toList } = require('../../lib/collection');

/**
 * Return the first component (from a list of components) with a truthy `displaySelf` property. Used by Spaces.
 * @param  {array} components with `displaySelf` properties
 * @return {object} first component with `displaySelf: true`
 */
module.exports = function (components) {
  const first = toList(components).find(item => item.displaySelf);

  return first ? [first] : [];
};

module.exports.example = {
  code: '{{> component-list (displaySelf content) }}'
};
