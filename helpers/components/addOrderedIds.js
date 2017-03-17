'use strict';
const _ = require('lodash');

/**
 * Add ordered ids to components within a componentlist
 * @param {Array} content   list of components
 * @param {string} prefix   prefix for the ids
 * @param {number} [offset] index to start at, defaults to 1
 * @return {Array} content
 */
module.exports = function (content, prefix, offset) {
  if (offset && typeof offset === 'number') {
    offset = offset;
  } else {
    offset = 1;
  }
  return (content || []).map((component, index) => _.set(component, 'orderedId', prefix + (index + offset)));
};

module.exports.example = {
  code: '{{> component-list (addOrderedIds content "annotation-") }}'
};
