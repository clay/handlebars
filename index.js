'use strict';
const glob = require('glob'),
  path = require('path'),
  // 3rd party helpers, well-maintained
  hbsHelpers = require('handlebars-helpers'),
  yaml = require('helper-yaml'),
  outdent = require('outdent');

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
  // docs are here: http://assemble.io/helpers/
  hbsHelpers({ handlebars: env });
  env.registerHelper('yaml', yaml.sync);

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
