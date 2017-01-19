'use strict';
const striptags = require('striptags'),
  speakingurl = require('speakingurl'),
  he = require('he'),
  _ = require('lodash');

/**
 * Removes all unicode from string
 * mostly used for stripping various curly quotes
 * @param {string} str
 * @returns {string}
 */
function stripUnicode(str) {
  return str.replace(/[^A-Za-z 0-9\.,\?!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]~]*/g, '');
}

/**
 * slugify text
 * @param  {string} word
 * @return {string}
 */
function toSlug(word) {
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
 * wraps each letter in a span
 * @param {string} letter
 * @param {integer} index (array index)
 * @returns {string}
 */
function addCharSpan(letter, index) {
  return `<span class="_char${index}">${letter}</span>`;
}

/**
 * generate mark-up where each letter of a word is wrapped in a span
 * @param {string} word
 * @returns {string}
 */
function generateLetterClasses(word) {
  const letters = word.split('');

  return _.map(letters, addCharSpan).join('');
}

/**
 * wrap a word in a class
 * @param {string} word
 * @param {number} index
 * @param {array} array
 * @param {boolean} hasLetterClasses
 * @returns {string}
 */
function wrapWord(word, index, array, hasLetterClasses) {
  const isLastWord = _.last(array) === word,
    suffixSpace = isLastWord ? '' : ' ',
    finalWord = hasLetterClasses ? generateLetterClasses(word) : word;

  // note: we add the space after each word (except the last word) INSIDE the span
  // because otherwise browsers will display them weirdly if they're styled differently
  // than the words
  return `<span class="${generateWordClass(word)}">${finalWord}${suffixSpace}</span>`;
}

/**
 * wraps each word in spans with classes
 * allowing designers and devs to target individual words with css
 * @param {string} html
 * @param {object} options
 * @param {boolean} [options.hash.perLetter] if you want an extra span wrapping each letter. defaults to true
 * @returns {string} words wrapped in classes
 */
function helper(html, options) {
  let words, hasLetterClasses;

  if (_.isEmpty(html) || !_.isString(html)) {
    return ''; // fail gracefully
  }

  if (options.hash.perLetter !== false) {
    // if it's not EXPLICITLY false, add letter classes
    hasLetterClasses = true;
  } else {
    hasLetterClasses = false;
  }

  // replace nonbreaking spaces before splitting the text
  words = html.split(' ');
  return _.map(words, (word, index, array) => wrapWord(word, index, array, hasLetterClasses)).join('');
}

module.exports = helper;
// for testing
module.exports.toSlug = toSlug;

module.exports.example = {
  code: '{{{ perWordClasses "One two three" }}}',
  result: '<span class="_one">One</span> <span class="_two">two</span> <span class="_three">three</span>'
};
