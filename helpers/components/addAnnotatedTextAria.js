'use strict';
const _ = require('lodash');

/**
 * Add aria to phrases in paragraphs, corresponds to annotation ids.
 * @param {array} content   list of components
 * @return {array} content
 */
module.exports = function (content) {
  let counter = 0;

  return (content || []).map(function (component) {
    if (
      _.includes(_.get(component, '_ref'), '/clay-paragraph/') &&
      _.includes(_.get(component, 'text'), 'clay-annotated')
    ) {
      component.text = (component.text || '').replace(
        /\<span class="clay-annotated"/g,
        match => match + ' aria-describedby="annotation-' + ++counter + '" tabindex="0"'
      );
    }
    return component;
  });
};

module.exports.example = {
  code: '{{> component-list (addAnnotatedTextAria content)}}'
};
