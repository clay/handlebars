import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url),
  Handlebars = require('handlebars'),
  root = path.dirname(fileURLToPath(import.meta.url)),
  // client.js shares one copy of the Handlebars runtime with the precompiled partials
  RUNTIME = 'handlebars/dist/handlebars.runtime.min.js';

/**
 * Partials are .hbs files that client.js require()s as ready-to-run template functions: compile them to the format
 * of the Handlebars runtime when the bundle is built, so the browser needs no compiler.
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
  plugins: [precompilePartials()],
  build: {
    lib: {
      entry: path.join(root, 'client.js'),
      formats: ['cjs'],
      fileName: () => 'browser.js'
    },
    outDir: 'dist',
    emptyOutDir: true,
    // Kiln's browser targets (Chrome 87 / Safari 14) read this file as it is: syntax is lowered to this, but the
    // helpers must not use a newer API (Object.hasOwn, Array.prototype.at, ...) either
    target: 'es2018'
  }
});
