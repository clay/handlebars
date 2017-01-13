'use strict';
const _ = require('lodash');

/**
 * Return all components (from a list of components) with a truthy `displaySelf` property. Used by Spaces.
 * @param  {array} components with `displaySelf` properties
 * @return {array} all components with `displaySelf: true`
 */
module.exports = function (components) {
  return _.filter(components, item => item.displaySelf);
};

module.exports.example = {
  code: '{{> component-list (displaySelfAll content) }}'
};
