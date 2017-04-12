'use strict';
const helpersReq = require.context('./helpers', true, /^.*?\/[\w\-]+\.js$/),
  partialsReq = require.context('./partials', false, /^.*\.hbs$/),
  path = require('path');

module.exports = function (env) {
  if (!env) {
    env = require('handlebars/dist/handlebars.runtime.min.js');
  }

  // add noop to `read` and `yaml` helpers on the client-side
  env.registerHelper('read', () => '');
  env.registerHelper('yaml', () => '');

  // add helpers
  helpersReq.keys().forEach(h => env.registerHelper(path.basename(h, '.js'), helpersReq(h)));

  // add partials
  partialsReq.keys().forEach(p => env.registerPartial(path.basename(p, '.hbs'), partialsReq(p)));

  return env;
};
