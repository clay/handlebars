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
  offset = typeof offset === 'number' ? offset : 1;
  if (content && prefix) {
  	return (content || []).map((component, index) => _.set(component, 'orderedId', prefix + (index + offset)));
  } else {
  	throw new Error('Handlebars Helper "addOrderedIds" needs content and a prefix');
  }
};

module.exports.example = {
  code: '{{> component-list (addOrderedIds content "annotation-") }}'
};
