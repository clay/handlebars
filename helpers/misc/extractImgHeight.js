'use strict';
const imageDimension = require('../../lib/image-dimension');

/**
 * Extract the height of a mediaplay image given the image URL.
 * @param {string} url
 * @returns {object} extracted height
 */
module.exports = function (url) {
  return imageDimension(url, 2);
};

module.exports.example = {
  code: '{{ extractImgHeight feedImgUrl }}',
  result: '946'
};
