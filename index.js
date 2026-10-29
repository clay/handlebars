'use strict';
const fs = require('fs'),
  path = require('path'),
  helpers = require('./lib/helpers'),
  partials = require('./lib/partials'),
  read = require('./lib/read'),
  log = require('./lib/log'),
  yaml = require('./lib/yaml');

/**
 * A partial that reads and compiles its file when it is first rendered, not when it is registered.
 * @param {string} name of the file in partials/, without .hbs
 * @returns {function} what registerPartial takes: a template function
 */
function lazyPartial(name) {
  const file = path.join(__dirname, 'partials', `${name}.hbs`);
  let template;

  return function (context, options) {
    template = template || require('handlebars').compile(fs.readFileSync(file, 'utf8'));

    return template(context, options);
  };
}

/**
 * Add the helpers and partials of clayhandlebars to a Handlebars environment.
 *
 * @param  {object} [env] a Handlebars environment, anything with `registerHelper` and `registerPartial`; a new one by default
 * @return {object} the environment
 */
module.exports = function (env) {
  if (!env) {
    // instantiate a new handlebars
    env = require('handlebars');
  }

  // add 3rd party helpers first (in case we need to overwrite any)
  env.registerHelper('yaml', yaml);

  // support `read` helper on the server-side ONLY
  // todo: deprecate this when we figure out how to precompile these assets
  env.registerHelper('read', function (filename) {
    try {
      return read(filename);
    } catch (error) {
      log('error', `Failure to read ${filename}.`, { error });
    }
  });

  // add helpers
  Object.keys(helpers).forEach(name => env.registerHelper(name, helpers[name]));

  // add partials
  partials.forEach(name => env.registerPartial(name, lazyPartial(name)));

  return env;
};

/**
 * only render component partials if their _ref or _self exists
 * @param  {string} name of component
 * @param  {string} code contents of the template
 * @return {string}      wrapped template string
 */
module.exports.wrapPartial = function (name, code) {
  return [
    '{{#ifAny _ref _self}}',
    `  ${code}`,
    '{{else}}',
    `  <!-- unable to render partial ${name} without a supplied context -->`,
    '{{/ifAny}}'
  ].join('\n');
};
