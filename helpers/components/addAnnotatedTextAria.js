'use strict';

/**
 * Add aria to phrases in paragraphs, corresponds to annotation ids.
 * @param {array} content   list of components
 * @return {array} content
 */
module.exports = function (content) {
  let counter = 0;

  return (content || []).map(function (component) {
    const ref = component && component._ref,
      text = component && component.text;

    if (typeof ref === 'string' && ref.includes('/clay-paragraph/') && typeof text === 'string' && text.includes('clay-annotated')) {
      component.text = text.replace(
        /<span class="clay-annotated.*?"/g,
        match => match + ' aria-describedby="annotation-' + ++counter + '" tabindex="0"'
      );
    }
    return component;
  });
};

module.exports.example = {
  code: '{{> component-list (addAnnotatedTextAria content)}}'
};
