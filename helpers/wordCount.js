const stripTags = require('striptags');

/**
 * counts the words
 * @param {string} [html]
 * @returns {Number}
 */
function htmlToWordCount(html) {
  return stripTags(html || '').split(' ').filter(word => word.trim()).length;
}

module.exports = htmlToWordCount;
