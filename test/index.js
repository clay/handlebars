'use strict';
const glob = require('glob'),
  path = require('path'),
  helperTests = glob.sync(path.resolve('.', 'helpers', '**', '*.test.js')),
  partialTests = glob.sync(path.resolve('.', 'partials', '**', '*.test.js'));

// register globals (that can be used in test files)
global.expect = require('chai').expect;
global.getName = (filename) => filename.split('/').pop().split('.').shift();
global.hbs = require('handlebars');

describe('Helpers', function () {
  helperTests.forEach(function (testFile) {
    const name = getName(testFile),
      fn = require(testFile.replace('.test', ''));

    // register the helpers first
    hbs.registerHelper(name, fn);
  });

  // then run tests
  helperTests.forEach(testFile => require(testFile));
});

describe('Partials', function () {
  partialTests.forEach(function (testFile) {
    const name = getName(testFile),
      template = require(testFile.replace('.test.js', '.hbs'));

    // register the partial
    hbs.registerPartial(name, template);
    // run tests
    require(testFile);
  });
});
