'use strict';
const hbs = require('../.')(),
  _ = require('lodash'),
  path = require('path'),
  fs = require('fs'),
  chalk = require('chalk'),
  glob = require('glob'),
  doc = require('documentation');

let tpl, data;

function noTests(filename) {
  return filename.indexOf('.test.js') === -1;
}

/**
 * parse jsdoc descriptions for code blocks and such
 * @param  {object} block
 * @return {string}
 */
function parseDoc(block) {
  return block.type === 'inlineCode' ? '`' + block.value + '`' : block.value;
}

/**
 * parse JSDoc types
 * @param  {object} obj
 * @return {string}
 */
function parseType(obj) {
  if (obj.type === 'NameExpression') {
    // {array}, {string}, {object}, etc
    return obj.name;
  } else if (obj.type === 'AllLiteral') {
    // {*}
    return '*';
  } else if (obj.type === 'OptionalType') {
    // we don't care if something is optional (in this function)
    return parseType(obj.expression);
  } else if (obj.type === 'UnionType') {
    // {string|array}, etc
    return _.map(obj.elements, (el) => parseType(el)).join('|');
  } else {
    // you should tell a dev, because we don't know what we're dealing with here
    throw new Error(`Unknown type "${obj.type}"!`);
  }
}

function generateDoc(helper) {
  const rawDoc = doc.buildSync([helper], { shallow: true })[0];

  if (!_.isEmpty(rawDoc)) {
    let desc = _.get(rawDoc, 'description.children[0].children') || [],
      ret = _.get(rawDoc, 'returns[0].description.children[0].children') || [],
      returnType = _.get(rawDoc, 'returns[0].type.name'),
      description = desc.map(parseDoc).join(' ').replace('\n', '<br />'),
      params = _.map(rawDoc.params, function (param) {
        let desc = _.get(param, 'description.children[0].children') || [];

        return {
          name: param.name,
          type: parseType(param.type),
          isOptional: _.get(param, 'type.type') === 'OptionalType',
          description: desc.map(parseDoc).join(' ')
        };
      }),
      returnValue = ret.map(parseDoc).join(' ');

    return {
      description,
      params,
      returnValue,
      returnType
    };
  } else {
    return {};
  }
}

/**
 * get data for helper
 * @param  {string} category name
 * @return {function}
 */
function reduceHelpers(category) {
  return function (result, helper) {
    // helperDoc contains description, params, and returnValue
    // module.exports.example contains code and result
    const helperDoc = generateDoc(helper),
      info = _.assign({
        name: path.basename(helper, '.js'),
        hasTestFile: fs.existsSync(helper.replace('.js', '.test.js')),
        category: category
      }, helperDoc, require(helper).example || {});

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
