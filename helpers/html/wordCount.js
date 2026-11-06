'use strict';
const stripTags = require('striptags');

/**
 * counts the words in a string of text or html
 * @param {string} [html]
 * @returns {number} the number of words
 */
module.exports = function (html) {
  // striptags 3 throws for anything but a string; 2 returned '' for the options object Handlebars passes when the argument is missing
  return stripTags(typeof html === 'string' ? html : '').split(' ').filter(word => word.trim()).length;
};

module.exports.example = {
  code: '{{wordCount "<div> This is <b> cool </b> </div>"}}',
  result: '3'
};
