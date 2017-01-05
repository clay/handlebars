const glob = require('glob'),
  path = require('path'),
  hbsHelpers = require('handlebars-helpers'); // 3rd party helpers, well-maintained

// filter out tests from globbed files
function noTests(filename) {
  return filename.indexOf('.test.js') === -1;
}

module.exports = function (env) {
  const helpers = glob.sync(path.resolve(__dirname, 'helpers', '**', '*.js')).filter(noTests),
    partials = glob.sync(path.resolve(__dirname, 'partials', '**', '*.js')).filter(noTests);

  if (!env) {
    // instantiate a new handlebars
    env = require('handlebars');
  }

  // add 3rd party helpers first (in case we need to overwrite any)
  // docs are here: http://assemble.io/helpers/
  hbsHelpers({ handlebars: env });

  // add helpers
  helpers.forEach(h => env.registerHelper(path.basename(h, '.js'), require(h)));

  // add partials
  partials.forEach(p => env.registerPartial(path.basename(p, '.js'), require(p)));

  return env;
};
