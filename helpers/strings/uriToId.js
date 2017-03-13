'use strict';

/**
 * returns the last part of a URI
 * @param {string} uri
 * @return {string}
 */
module.exports = function (uri) {
  if (typeof uri !== 'string') {
    throw new Error('uriToId requires a string argument!');
  }
  return uri.split('/').slice(-1)[0];
};

module.exports.example = {
  code: '{{ uriToId "/components/a/b" }}',
  result: 'b'
};
