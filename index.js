const glob = require('glob'),
  path = require('path');

module.exports = function (env) {
  var helpers = glob.sync(path.resolve('.', 'helpers', '*.js')),
    partials = glob.sync(path.resolve('.', 'partials', '*.js'));

  if (!env) {
    // instantiate a new handlebars
    env = require('handlebars');
  }

  // add helpers
  helpers.forEach(h => env.registerHelper(path.basename(h, '.js'), require(h)));

  // add partials
  partials.forEach(p => env.registerPartial(path.basename(p, '.js'), require(p)));

  return env;
};
