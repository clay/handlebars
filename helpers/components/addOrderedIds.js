'use strict';
const { set } = require('../../lib/path');

/**
 * Add ordered ids to components within a componentlist
 * @param {Array} content   list of components
 * @param {string} prefix   prefix for the ids
 * @param {number} [offset] index to start at, defaults to 1
 * @return {Array} content
 */
module.exports = function (content, prefix, offset) {
  offset = typeof offset === 'number' ? offset : 1;
  if (content && prefix) {
    // set(), not `component.orderedId =`: a frozen or sealed component, or something that isn't an object, is passed on untouched
    return content.map((component, index) => set(component, 'orderedId', prefix + (index + offset)));
  } else {
    throw new Error('Handlebars Helper "addOrderedIds" needs content and a prefix');
  }
};

module.exports.example = {
  code: '{{> component-list (addOrderedIds content "annotation-") }}'
};
