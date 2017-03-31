'use strict';

// Regex to find dimensions and extract width and multiplier (where included)
// Resulting array contains [full match, width, multiplier]
const dimRegex = /\.w([0-9]+)\.h(?:[0-9]+)\.(?:([1-2])x\.)?/;

/**
 * Extract the width of a mediaplay image given the image URL.
 * @param {string} url
 * @returns {object} extracted width
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

      // Width * multiplier
      return parseInt(matches[1], 10) * multiplier;
    }
  }

  return null;
};

module.exports.example = {
  code: '{{ extractImgWidth feedImgUrl }}',
  result: '1420'
};
