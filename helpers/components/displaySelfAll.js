'use strict';
const _filter = require('lodash/filter');

/**
 * Return all components (from a list of components) with a truthy `displaySelf` property. Used by Spaces.
 * @param  {array} components with `displaySelf` properties
 * @return {array} all components with `displaySelf: true`
 */
module.exports = function (components) {
  return _filter(components, item => item.displaySelf);
};

module.exports.example = {
  code: '{{> component-list (displaySelfAll content) }}'
};
