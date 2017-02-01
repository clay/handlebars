'use strict';
const helpersReq = require.context('./helpers', true, /^.*?\/[\w\-]+\.js$/),
  partialsReq = require.context('./partials', false, /^.*\.hbs$/),
  path = require('path');

module.exports = function (env) {
  if (!env) {
    env = require('handlebars/dist/handlebars.runtime.min.js');
  }

  // add 3rd party helpers first (in case we need to overwrite any)
  require('./third-party-helpers')(env);

  // add noop to `read` helper on the client-side
  // todo: deprecate this when we figure out how to precompile these assets
  // (and thus remove the helper from the server-side)
  env.registerHelper('read', () => '');

  // add helpers
  helpersReq.keys().forEach(h => env.registerHelper(path.basename(h, '.js'), helpersReq(h)));

  // add partials
  partialsReq.keys().forEach(p => env.registerPartial(path.basename(p, '.hbs'), partialsReq(p)));

  return env;
};
