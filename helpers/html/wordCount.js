const stripTags = require('striptags');

/**
 * counts the words
 * @param {string} [html]
 * @returns {string}
 */
function htmlToWordCount(html) {
  return stripTags(html || '').split(' ').filter(word => word.trim()).length.toString();
}

module.exports = htmlToWordCount;
