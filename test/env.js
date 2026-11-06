'use strict';
// the tests that make a helper fail on purpose don't print the logs of it (LOG=info npm test shows them)
process.env.LOG = process.env.LOG || 'silent';

const Handlebars = require('handlebars'),
  clayhandlebars = require('../index.js');

// a Handlebars environment with everything clayhandlebars registers; each test file gets its own
module.exports = { hbs: clayhandlebars(Handlebars.create()) };
