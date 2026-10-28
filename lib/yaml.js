'use strict';
/**
 * The server-side `yaml` helper: parses the YAML in a string, usually a file read with the `read` helper:
 * `{{#with (yaml (read "data.yml"))}}...{{/with}}`. js-yaml is only loaded when a template uses it.
 */

/**
 * @param {string} str YAML
 * @param {...*} rest js-yaml options; Handlebars' own options object, which comes last, is ignored
 * @returns {*} what the YAML holds, or undefined if it can't be parsed (the problem is logged)
 * @throws {TypeError} if what it is given isn't a string
 */
module.exports = function yaml(str, ...rest) {
  const last = rest[rest.length - 1];

  if (typeof str !== 'string') {
    throw new TypeError('The yaml helper needs a string to parse');
  }

  if (last && typeof last === 'object' && Object.hasOwn(last, 'hash') && Object.hasOwn(last, 'data')) {
    rest.pop();
  }

  try {
    return require('js-yaml').load(str, ...rest);
  } catch (error) {
    // loaded when it is needed, so requiring clayhandlebars doesn't set up a logger
    require('./log')('error', 'The yaml helper could not parse its input.', { error });
  }
};
