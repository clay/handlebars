'use strict';
const striptags = require('striptags');

// speakingurl and he are big (language tables, every HTML entity) and only this helper needs them
let speakingurl, he;

/**
 * Removes all unicode from string
 * mostly used for stripping various curly quotes
 * (keeps the printable ASCII punctuation but not quotes, apostrophes or backticks)
 * @param {string} str
 * @returns {string}
 */
function stripUnicode(str) {
  return str.replace(/[^ !#-&(-_a-~]+/g, '');
}

/**
 * slugify text
 * @param  {string} word
 * @return {string}
 */
function toSlug(word) {
  speakingurl = speakingurl || require('speakingurl');
  he = he || require('he');

  // strip unicode (mostly curly quotes)
  // strip html tags (like <b>)
  // decode html entities (like &amp;)
  // generate slugified version
  return speakingurl(he.decode(striptags(stripUnicode(word))), {custom: {_: '-'}});
}

/**
 * generate the class for the word
 * an underscore prefix is added to all words for consistency
 * (css classes cannot begin with a number or other non-alpha character)
 * @param {string} word
 * @returns {string}
 */
function generateWordClass(word) {
  return `_${toSlug(word)}`;
}

/**
 * generate mark-up where each letter of a word is wrapped in a span
 * @param {string} word
 * @returns {string}
 */
function generateLetterClasses(word) {
  return word.split('').map((letter, index) => `<span class="_char${index}">${letter}</span>`).join('');
}

/**
 * wraps each word in spans with classes allowing designers and devs to target individual words with css
 * @param {string} html to add classes to
 * @param {object} options
 * @param {boolean} [options.hash.perLetter] if you want an extra span wrapping each letter. defaults to true
 * @returns {string} words wrapped in classes
 */
module.exports = function (html, options) {
  if (!(typeof html === 'string' || html instanceof String) || html.length === 0) {
    return ''; // fail gracefully
  }

  // if it's not EXPLICITLY false, add letter classes
  const hasLetterClasses = options.hash.perLetter !== false,
    words = String(html).split(' ');

  // note: we add the space after each word (except the last word) INSIDE the span
  // because otherwise browsers will display them weirdly if they're styled differently
  // than the words
  return words.map((word, index) => {
    const finalWord = hasLetterClasses ? generateLetterClasses(word) : word;

    return `<span class="${generateWordClass(word)}">${finalWord}${index === words.length - 1 ? '' : ' '}</span>`;
  }).join('');
};

// for testing
module.exports.toSlug = toSlug;

module.exports.example = {
  code: '{{{ perWordClasses "One two three" perLetter=false }}}',
  result: '<span class="_one">One</span> <span class="_two">two</span> <span class="_three">three</span>'
};
