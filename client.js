'use strict';
const helpers = require('./lib/helpers'),
  // the partials are compiled when the bundle is built (see vite.config.mjs): each one is a template function
  partials = {
    'component-list': require('./partials/component-list.hbs')
  };

/**
 * Add the helpers and partials of clayhandlebars to a Handlebars environment in the browser.
 *
 * @param  {object} [env] a Handlebars environment; a new one of the runtime (templates have to be precompiled) by default
 * @return {object} the environment
 */
module.exports = function (env) {
  if (!env) {
    env = require('handlebars/dist/handlebars.runtime.min.js');
  }

  // add noop to `read` and `yaml` helpers on the client-side
  env.registerHelper('read', () => '');
  env.registerHelper('yaml', () => '');

  // add helpers
  Object.keys(helpers).forEach(name => env.registerHelper(name, helpers[name]));

  // add partials
  Object.keys(partials).forEach(name => env.registerPartial(name, partials[name]));

  return env;
};
