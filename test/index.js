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

    // register the helper
    hbs.registerHelper(name, fn);
    // run tests
    require(testFile);
  });
});

describe('Partials', function () {
  partialTests.forEach(function (testFile) {
    const name = getName(testFile),
      fn = require(testFile.replace('.test', ''));

    // register the partial
    hbs.registerPartial(name, fn);
    // run tests
    require(testFile);
  });
});
