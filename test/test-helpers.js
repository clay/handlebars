global.expect = require('chai').expect;
global.getName = (filename) => filename.split('/').pop().split('.').shift();
global.hbs = require('handlebars');
