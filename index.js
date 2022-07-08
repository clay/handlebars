'use strict';

const glob = require('glob'),
  path = require('path'),
  outdent = require('outdent'),
  fs = require('fs');

// filter out tests from globbed files
function noTests(filename) {
  return filename.indexOf('.test.js') === -1;
}

module.exports = function (env) {
  const helpers = glob.sync(path.resolve(__dirname, 'helpers', '**', '*.js')).filter(noTests),
    partials = glob.sync(path.resolve(__dirname, 'partials', '**', '*.hbs')).filter(noTests);

  if (!env) {
    // instantiate a new handlebars
    env = require('handlebars');
  }

  // add 3rd party helpers first (in case we need to overwrite any)
  require('./third-party-helpers')(env);

  // support `read` helper on the server-side ONLY
  // todo: deprecate this when we figure out how to precompile these assets
  env.registerHelper('read', function (filename) {
    try {
      return fs.readFileSync(filename, 'utf-8');
    } catch (error) {
      console.log(`Failure to read ${filename}. Error: ${error}`);
    }
  });

  // add helpers
  helpers.forEach(h => env.registerHelper(path.basename(h, '.js'), require(h)));

  // add partials
  partials.forEach(p => env.registerPartial(path.basename(p, '.hbs'), require(p)));

  return env;
};

/**
 * only render component partials if their _ref or _self exists
 * @param  {string} name of component
 * @param  {string} code contents of the template
 * @return {string}      wrapped template string
 */
module.exports.wrapPartial = function (name, code) {
  return outdent`
    {{#ifAny _ref _self}}
      ${code}
    {{else}}
      <!-- unable to render partial ${name} without a supplied context -->
    {{/ifAny}}`;
};
