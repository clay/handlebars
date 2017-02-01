'use strict';
// a unified collection of third party helpers, used on both the client and the server
const yaml = require('helper-yaml'),
  date = require('helper-date');

/**
 * pass an environment in
 * @param  {handlebars} env
 */
module.exports = function (env) {
  env.registerHelper('yaml', yaml.sync);
  env.registerHelper('moment', date);
};
