'use strict';

/**
 * filters component references in a component list
 * @param {array} content         list of components
 * @param {boolean} shouldKeep    if true, only matching component references are returned; if false, then only non-matching component references are returned
 * @param {string} componentName  name of the component to remove from the list (accepts multiple arguments)
 * @return {array} content
 */
module.exports = function (content, shouldKeep) {
  const componentNames = Array.prototype.slice.call(arguments,2);

  return (content || []).filter(component => {
    const hasComponent = component && component._ref && componentNames.find(componentName => component._ref.indexOf(`/${componentName}/`) > -1);

    return shouldKeep ? hasComponent : !hasComponent;
  });
};

module.exports.example = {
  code: '{{> component-list (filterComponents content "some-component" "another-component")}}'
};
