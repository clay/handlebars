'use strict';
/**
 * Generates README.md from docs/readme.hbs, the JSDoc comment above each helper and the `example` it exports.
 *
 *   npm run generate-readme          writes README.md
 *   npm run check-readme             fails if README.md is not what would be written (CI runs this)
 *
 * The JSDoc of a helper is read for its first paragraph of description, its @param tags (`options.hash.x` style names
 * too) and its @return tag. The description and parameter texts are markdown and used as written.
 */
const fs = require('node:fs'),
  path = require('node:path'),
  Handlebars = require('handlebars'),
  clayhandlebars = require('../index.js');

const root = path.join(__dirname, '..');

/**
 * @param {string} dir
 * @returns {string[]} the .js files in a directory that are not tests, sorted
 */
function helperFiles(dir) {
  return fs.readdirSync(dir).filter(file => file.endsWith('.js') && !file.endsWith('.test.js')).sort();
}

/**
 * @param {string} source the code of a helper
 * @returns {?string} the text of the JSDoc comment right above `module.exports =`
 */
function docComment(source) {
  const match = /\/\*\*((?:(?!\*\/)[\s\S])*)\*\/\s*module\.exports\s*=/.exec(source);

  return match ? match[1] : null;
}

/**
 * @param {string} comment the inside of a JSDoc comment
 * @returns {string[]} its lines, without the leading ` * `
 */
function commentLines(comment) {
  return comment.split('\n').map(line => line.replace(/^\s*\*? ?/, '').replace(/\s+$/, ''));
}

/**
 * Split the lines of a comment into its description and its tags, each tag with the lines that continue it.
 * @param {string[]} lines
 * @returns {{description: string[], tags: Array<{tag: string, text: string}>}}
 */
function splitTags(lines) {
  const description = [], tags = [];

  lines.forEach((line) => {
    const tag = /^@(\w+)\s*(.*)$/.exec(line);

    if (tag) {
      tags.push({ tag: tag[1], text: tag[2] });
    } else if (tags.length) {
      tags[tags.length - 1].text += ' ' + line.trim();
    } else {
      description.push(line);
    }
  });

  return { description, tags };
}

/**
 * @param {string} text what follows @param: `{type} [name] description`
 * @returns {?object} the parameter, or null if the text isn't one
 */
function parseParam(text) {
  const match = /^\{([^}]*)\}\s+(\[[^\]]*\]|\S+)\s*(.*)$/.exec(text.trim());

  if (!match) {
    return null;
  }

  return {
    name: match[2].replace(/^\[|\]$/g, '').replace(/=.*$/, ''),
    type: match[1].trim(),
    isOptional: match[2].startsWith('['),
    description: match[3].replace(/^-\s*/, '').trim()
  };
}

/**
 * @param {string} source the code of a helper
 * @returns {{description: string, params: object[], returnValue: string, returnType: string}}
 */
function parseDoc(source) {
  const comment = docComment(source);

  if (!comment) {
    return {};
  }

  const split = splitTags(commentLines(comment)),
    returns = split.tags.find(tag => tag.tag === 'return' || tag.tag === 'returns'),
    returned = returns && /^\{([^}]*)\}\s*(.*)$/.exec(returns.text),
    // the first paragraph only, lines of it joined with a line break
    paragraph = split.description.join('\n').trim().split(/\n\s*\n/)[0];

  return {
    description: paragraph.replace(/\n/g, '<br />'),
    params: split.tags.filter(tag => tag.tag === 'param').map(tag => parseParam(tag.text)).filter(Boolean),
    returnValue: returned ? returned[2].replace(/^-\s*/, '').trim() : '',
    // only a plain type name is shown: not a union ({undefined|boolean}) or {*}
    returnType: returned && /^[\w$.]+$/.test(returned[1].trim()) ? returned[1].trim() : undefined
  };
}

/**
 * @param {string} rootDir the repository
 * @returns {object} what readme.hbs renders
 */
function readData(rootDir) {
  const helpersDir = path.join(rootDir, 'helpers'),
    partialsDir = path.join(rootDir, 'partials'),
    categories = fs.readdirSync(helpersDir).filter(name => fs.statSync(path.join(helpersDir, name)).isDirectory()).sort().map((category) => {
      return {
        name: category,
        helpers: helperFiles(path.join(helpersDir, category)).map((file) => {
          const helper = path.join(helpersDir, category, file);

          return Object.assign({
            name: path.basename(file, '.js'),
            hasTestFile: fs.existsSync(helper.replace(/\.js$/, '.test.js')),
            category
          }, parseDoc(fs.readFileSync(helper, 'utf8')), require(helper).example || {});
        })
      };
    });

  return {
    categories,
    totalHelpers: categories.reduce((total, category) => total + category.helpers.length, 0),
    partials: fs.readdirSync(partialsDir).filter(file => file.endsWith('.hbs')).sort().map((file) => {
      return { name: path.basename(file, '.hbs'), hasTestFile: fs.existsSync(path.join(partialsDir, file.replace(/\.hbs$/, '.test.js'))) };
    })
  };
}

/**
 * @param {string} [rootDir] the repository to read the helpers of (the templates are always this one's)
 * @returns {string} the README
 */
function generate(rootDir) {
  const hbs = clayhandlebars(Handlebars.create());

  ['categorySection', 'details', 'toc'].forEach((name) => {
    hbs.registerPartial(name, hbs.compile(fs.readFileSync(path.join(__dirname, `${name}.hbs`), 'utf8')));
  });

  return hbs.compile(fs.readFileSync(path.join(__dirname, 'readme.hbs'), 'utf8'))(readData(rootDir || root));
}

module.exports = { generate, parseDoc, readData };

if (require.main === module) {
  const readme = path.join(root, 'README.md'),
    generated = generate();

  if (process.argv.includes('--check')) {
    if (!fs.existsSync(readme) || fs.readFileSync(readme, 'utf8') !== generated) {
      console.error('README.md is out of date: run `npm run generate-readme` and commit the result.');
      process.exit(1);
    }

    console.log('README.md is up to date');
  } else {
    fs.writeFileSync(readme, generated);
    console.log('[DONE] Generated readme');
  }
}
