'use strict';
const helpersReq = require.context('./helpers', true, /^.*?\/[\w\-]+\.js$/),
  partialsReq = require.context('./partials', false, /^.*\.hbs$/),
  yaml = require('helper-yaml'),
  path = require('path');

module.exports = function (env) {
  if (!env) {
    env = require('handlebars/dist/handlebars.runtime.min.js');
  }

  // add 3rd party helpers first (in case we need to overwrite any)
  // todo: add handlebars-helpers when it works client-side
  env.registerHelper('yaml', yaml.sync);

  // add helpers
  helpersReq.keys().forEach(h => env.registerHelper(path.basename(h, '.js'), helpersReq(h)));

  // add partials
  partialsReq.keys().forEach(p => env.registerPartial(path.basename(p, '.hbs'), partialsReq(p)));

  return env;
};
