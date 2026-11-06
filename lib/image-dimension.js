'use strict';

// '.w1420.h946.2x.' in a mediaplay image url: width, height, and an optional 1x or 2x multiplier
const DIMENSIONS = /\.w([0-9]+)\.h([0-9]+)\.(?:([1-2])x\.)?/;

/**
 * Extract the width or height, times the multiplier, from a mediaplay image url.
 * @param {string} url
 * @param {number} group 1 for the width, 2 for the height
 * @returns {?number}
 */
module.exports = function imageDimension(url, group) {
  const matches = url && url !== '' ? url.match(DIMENSIONS) : null;

  if (matches && matches.length) {
    return parseInt(matches[group], 10) * (matches[3] ? parseInt(matches[3], 10) : 1);
  }

  return null;
};
