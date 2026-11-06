'use strict';
const imageDimension = require('../../lib/image-dimension');

/**
 * Extract the width of a mediaplay image given the image URL.
 * @param {string} url
 * @returns {Object} extracted width
 */
module.exports = function (url) {
  return imageDimension(url, 1);
};

module.exports.example = {
  code: '{{ extractImgWidth feedImgUrl }}',
  result: '1420'
};
