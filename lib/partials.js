'use strict';

// The partials, by name: each one is partials/<name>.hbs. index.js registers them without reading the files (they are read
// and compiled the first time a template renders one), so that creating an environment never touches the file system.
// lib/partials.test.js checks that this lists every file in partials/.
module.exports = ['component-list'];
