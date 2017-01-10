'use strict';
const stripTags = require('striptags');

/**
 * counts the words in a string of text or html
 * @param {string} [html]
 * @returns {string}
 */
function htmlToWordCount(html) {
  return stripTags(html || '').split(' ').filter(word => word.trim()).length.toString();
}

module.exports = htmlToWordCount;
