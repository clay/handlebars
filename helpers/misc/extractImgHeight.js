'use strict';

// Regex to find dimensions and extract height and multiplier (where included)
// Resulting array contains [full match, height, multiplier]
const dimRegex = /\.w(?:[0-9]+)\.h([0-9]+)\.(?:([1-2])x\.)?/;

/**
 * Extract the height of a mediaplay image given the image URL.
 * @param {string} url
 * @returns {object} extracted height
 */
module.exports = function (url) {
  var matches,
    multiplier = 1;

  if (url && url !== '') {
    matches = url.match(dimRegex);

    if (matches && matches.length) {
      // Multiplier
      if (matches[2]) {
        multiplier = parseInt(matches[2], 10);
      }

      // Height * multiplier
      return parseInt(matches[1], 10) * multiplier;
    }
  }

  return null;
};

module.exports.example = {
  code: '{{ extractImgHeight feedImgUrl }}',
  result: '946'
};
