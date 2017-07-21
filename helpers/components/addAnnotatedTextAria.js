'use strict';
const _includes = require('lodash/includes'),
  _get = require('lodash/get');

/**
 * Add aria to phrases in paragraphs, corresponds to annotation ids.
 * @param {array} content   list of components
 * @return {array} content
 */
module.exports = function (content) {
  let counter = 0;

  return (content || []).map(function (component) {
    if (
      _includes(_get(component, '_ref'), '/clay-paragraph/') &&
      _includes(_get(component, 'text'), 'clay-annotated')
    ) {
      component.text = component.text.replace(
        /\<span class=\"clay-annotated.*?"/g,
        match => match + ' aria-describedby="annotation-' + ++counter + '" tabindex="0"'
      );
    }
    return component;
  });
};

module.exports.example = {
  code: '{{> component-list (addAnnotatedTextAria content)}}'
};
