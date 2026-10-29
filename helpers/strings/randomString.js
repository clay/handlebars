'use strict';

const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  // bytes at or above this would favor the first characters (256 isn't a multiple of 62), so they're skipped
  MAX_BYTE = 256 - (256 % CHARACTERS.length),
  MAX_BYTES_PER_CALL = 65536; // what crypto.getRandomValues gives at once

/**
 * @param {number} length
 * @returns {string} that many random letters and digits, from the secure random number generator
 */
function generate(length) {
  let result = '';

  while (result.length < length) {
    const bytes = crypto.getRandomValues(new Uint8Array(Math.min(Math.ceil(length * 256 / MAX_BYTE), MAX_BYTES_PER_CALL)));

    for (let i = 0; i < bytes.length && result.length < length; i++) {
      if (bytes[i] < MAX_BYTE) {
        result += CHARACTERS.charAt(bytes[i] % CHARACTERS.length);
      }
    }
  }

  return result;
}

/**
 * @param {*} characters what the template gave as `characters`
 * @returns {number} the length of string to make; anything but a number was always ignored here (the random string
 *   package this replaces gave 32 characters), except an object, which could give a length of its own
 */
function lengthOf(characters) {
  if (typeof characters === 'number') {
    return characters;
  }

  return characters !== null && typeof characters === 'object' && typeof characters.length === 'number' ? characters.length : 32;
}

/**
 * generate a random string
 * _note:_ by default it generates an 8-character string
 * @param  {string} [prefix] string to append random stuff to
 * @param {object} [options]
 * @param {number} [options.hash.characters] generate string of a custom length
 * @return {string}
 */
module.exports = function (prefix, options) {
  if (options === undefined) {
    // no prefix defined, options is the first arg
    options = prefix;
    prefix = '';
  } else if (!(typeof prefix === 'string' || prefix instanceof String)) {
    prefix = '';
  }

  return prefix + generate(lengthOf(options.hash.characters || 8)); // default to 8 chars, but allow passing in any length
};

module.exports.example = {
  code: '{{ randomString "greatest-hit-" characters=3 }}',
  result: '"greatest-hit-z56"'
};
