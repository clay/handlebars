const glob = require('glob'),
  path = require('path'),
  hbsHelpers = require('handlebars-helpers'); // 3rd party helpers, well-maintained

module.exports = function (env) {
  const helpers = glob.sync(path.resolve('.', 'helpers', '*.js')),
    partials = glob.sync(path.resolve('.', 'partials', '*.js'));

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
