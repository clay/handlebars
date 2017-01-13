'use strict';
const stripTags = require('striptags');

/**
 * counts the words in a string of text or html
 * @param {string} [html]
 * @returns {number} the number of words
 */
function htmlToWordCount(html) {
  return stripTags(html || '').split(' ').filter(word => word.trim()).length;
}

module.exports = htmlToWordCount;

module.exports.example = {
  code: '{{wordCount "<div> This is <b> cool </b> </div>"}}',
  result: '3'
};
