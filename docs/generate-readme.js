'use strict';
const hbs = require('../.')(),
  _ = require('lodash'),
  path = require('path'),
  fs = require('fs'),
  chalk = require('chalk'),
  glob = require('glob');

let tpl, data;

function noTests(filename) {
  return filename.indexOf('.test.js') === -1;
}

function reduceHelpers(category) {
  return function (result, helper) {
    const info = _.assign({
      name: path.basename(helper, '.js'),
      hasTestFile: fs.existsSync(helper.replace('.js', '.test.js')),
      category: category
    }, require(helper).info || {});

    result.push(info);
    return result;
  };
}

/**
 * generate category data
 * @param  {array} result
 * @param  {array} category directory name
 * @return {array}
 */
function reduceCategories(result, category) {
  const dir = path.join(__dirname, '..', 'helpers', category);

  if (fs.statSync(dir).isDirectory()) {
    result.push({
      name: category,
      helpers: _.reduce(glob.sync(path.join(dir, '*.js')).filter(noTests), reduceHelpers(category), [])
    });
  }

  return result;
}

/**
 * generate partial data
 * @param  {array} result
 * @param  {string} partial
 * @return {array}
 */
function reducePartials(result, partial) {
  result.push({
    name: path.basename(partial, '.hbs'),
    hasTestFile: fs.existsSync(partial.replace('.hbs', '.test.js'))
  });
  return result;
}

// register all docs partials
_.each([
  'categorySection',
  'details',
  'toc'
], function (basename) {
  hbs.registerPartial(basename, require(`./${basename}.hbs`));
});

// get the helpers and partials
data = {
  categories: _.reduce(fs.readdirSync(path.join(__dirname, '..', 'helpers')), reduceCategories, []),
  totalHelpers: glob.sync(path.resolve(__dirname, '..', 'helpers', '**', '*.js')).filter(noTests).length,
  partials: _.reduce(glob.sync(path.resolve(__dirname, '..', 'partials', '*.hbs')), reducePartials, [])
};

// compile the template and run it
tpl = hbs.compile(fs.readFileSync(path.join(__dirname, 'readme.hbs'), 'utf8'));
fs.writeFileSync(path.join(__dirname, '..', 'README.md'), tpl(data));
console.log(`${chalk.green('[DONE]')} Generated readme`);
