import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url),
  Handlebars = require('handlebars'),
  root = path.dirname(fileURLToPath(import.meta.url)),
  // client.js shares one copy of the Handlebars runtime with the precompiled partials
  RUNTIME = 'handlebars/dist/handlebars.runtime.min.js',
  CONTEXT_CALL = /require\.context\(\s*'([^']+)'\s*,\s*(true|false)\s*,\s*(\/.*?\/)\s*\)/g,
  // the same shape webpack's require.context() had: a function with a keys() method
  CONTEXT_RUNTIME = `
function __clayRequireContext(byKey) {
  function req(key) {
    if (!(key in byKey)) {
      throw new Error("Cannot find module '" + key + "'");
    }

    return byKey[key];
  }

  req.keys = function () {
    return Object.keys(byKey);
  };

  return req;
}
`;

/**
 * List a require.context's keys the way webpack did: './relative/path' for every file under
 * `dir` (recursively if asked) whose key matches `filter`, sorted.
 * @param {string} absDir
 * @param {boolean} recursive
 * @param {RegExp} filter
 * @returns {string[]}
 */
function contextKeys(absDir, recursive, filter) {
  const keys = [];

  (function walk(dir, prefix) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const key = `${prefix}/${entry.name}`;

      if (entry.isDirectory()) {
        if (recursive) {
          walk(path.join(dir, entry.name), key);
        }
      } else if (filter.test(key)) {
        keys.push(key);
      }
    });
  }(absDir, '.'));

  return keys.sort();
}

/**
 * client.js was written for webpack, which expanded `require.context()` into every matching
 * file. Do the same at build time: each call becomes a map of static require()s, so a new or
 * renamed helper or partial is picked up and nothing is looked up at run time.
 * @returns {object} vite plugin
 */
function requireContext() {
  return {
    name: 'clay-require-context',
    enforce: 'pre',
    transform(code, id) {
      if (id !== path.join(root, 'client.js') || !code.includes('require.context')) {
        return null;
      }

      const out = code.replace(CONTEXT_CALL, (match, dir, recursive, literal) => {
        const absDir = path.resolve(root, dir),
          filter = new RegExp(literal.slice(1, -1)),
          entries = contextKeys(absDir, recursive === 'true', filter).map((key) => {
            return `${JSON.stringify(key)}: require(${JSON.stringify(`${dir}${key.slice(1)}`)})`;
          });

        this.addWatchFile(absDir);

        return `__clayRequireContext({ ${entries.join(', ')} })`;
      });

      if (out.includes('require.context')) {
        this.error('client.js: unrecognised require.context() call; use a literal directory, true|false and a regex literal');
      }

      return { code: `${out}\n${CONTEXT_RUNTIME}`, map: null };
    }
  };
}

/**
 * Partials are .hbs files that client.js require()s as ready-to-run template functions
 * (webpack did this with handlebars-template-loader): compile them to the runtime's format.
 * @returns {object} vite plugin
 */
function precompilePartials() {
  return {
    name: 'clay-precompile-partials',
    transform(code, id) {
      if (!id.endsWith('.hbs')) {
        return null;
      }

      return {
        code: `var Handlebars = require(${JSON.stringify(RUNTIME)});\nmodule.exports = (Handlebars['default'] || Handlebars).template(${Handlebars.precompile(code)});`,
        map: null
      };
    }
  };
}

export default defineConfig({
  plugins: [requireContext(), precompilePartials()],
  resolve: {
    // client.js and the helpers use path.basename, and randomstring needs a Buffer; a browser has
    // neither (webpack 2 bundled both on its own)
    alias: {
      path: require.resolve('path-browserify'),
      buffer: require.resolve('buffer/')
    }
  },
  build: {
    lib: {
      entry: path.join(root, 'client.js'),
      formats: ['cjs'],
      fileName: () => 'browser.js'
    },
    outDir: 'dist',
    emptyOutDir: true,
    // Kiln's browser targets (Chrome 87 / Safari 14) read this file as it is
    target: 'es2018'
  }
});
