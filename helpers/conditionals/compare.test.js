'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', '');

function testString(operator) {
  if (operator) {
    return `{{#compare a "${operator}" b}}yes{{else}}no{{/compare}}`;
  } else {
    return '{{#compare a b}}yes{{else}}no{{/compare}}';
  }
}

describe(name, function () {
  it('throws error if not enough arguments are passed in', function () {
    const result = function () {
      return hbs.compile('{{ compare a }}')({a: true}); // no b
    };

    assert.throws(result, Error);
  });

  it('throws error if unrecognized operator is passed in', function () {
    const result = function () {
      return hbs.compile(testString('+!+'))({a: true, b: true});
    };

    assert.throws(result, Error);
  });

  it('compares with strict equality by default', function () {
    const tpl = hbs.compile(testString());

    assert.equal(tpl({ a: true, b: true }), 'yes');
  });

  it('compares equality', function () {
    const tpl = hbs.compile(testString('==='));

    assert.equal(tpl({ a: 1, b: 2 }), 'no');
    assert.equal(tpl({ a: 1, b: 1 }), 'yes');
  });

  it('compares inequality', function () {
    const tpl = hbs.compile(testString('!=='));

    assert.equal(tpl({ a: 1, b: 2 }), 'yes');
    assert.equal(tpl({ a: 1, b: 1 }), 'no');
  });

  it('compares greater than', function () {
    const tpl = hbs.compile(testString('>'));

    assert.equal(tpl({ a: 1, b: 2 }), 'no');
    assert.equal(tpl({ a: 2, b: 1 }), 'yes');
  });

  it('compares less than', function () {
    const tpl = hbs.compile(testString('<'));

    assert.equal(tpl({ a: 1, b: 2 }), 'yes');
    assert.equal(tpl({ a: 2, b: 1 }), 'no');
  });

  it('compares greater than or equal', function () {
    const tpl = hbs.compile(testString('>='));

    assert.equal(tpl({ a: 2, b: 2 }), 'yes');
    assert.equal(tpl({ a: 2, b: 1 }), 'yes');
    assert.equal(tpl({ a: 1, b: 2 }), 'no');
  });

  it('compares less than or equal', function () {
    const tpl = hbs.compile(testString('<='));

    assert.equal(tpl({ a: 1, b: 2 }), 'yes');
    assert.equal(tpl({ a: 2, b: 2 }), 'yes');
    assert.equal(tpl({ a: 2, b: 1 }), 'no');
  });

  it('compares typeof', function () {
    const tpl = hbs.compile(testString('typeof'));

    assert.equal(tpl({ a: 1, b: 'number' }), 'yes');
    assert.equal(tpl({ a: 'foo', b: 'string' }), 'yes');
    assert.equal(tpl({ a: {}, b: 'string' }), 'no');
  });

  // inline comparison allows you to use this helper as a subexpression, e.g.
  // {{#ifAll (compare foo bar) (compare foo baz)}}
  it('compares inline with strict equality by default', function () {
    const tpl = hbs.compile('{{ compare a b }}');

    assert.equal(tpl({a: true, b: true}), 'true');
    assert.equal(tpl({a: true, b: false}), '');
  });

  it('compares inline with inequality', function () {
    const tpl = hbs.compile('{{ compare a "!==" b }}');

    assert.equal(tpl({a: true, b: true}), '');
    assert.equal(tpl({a: true, b: false}), 'true');
  });
});

describe(name + ': operators', function () {
  it('knows only its own operators, not the names of Object.prototype', function () {
    ['constructor', 'toString', 'hasOwnProperty', '__proto__', 'valueOf'].forEach((operator) => {
      assert.throws(() => hbs.compile(`{{#compare a "${operator}" b}}yes{{else}}no{{/compare}}`)({ a: 1, b: 2 }), /doesn't know the operator/);
    });
  });

  it('names Handlebars in its errors', function () {
    assert.throws(() => hbs.compile('{{ compare a }}')({ a: true }), /Handlebars Helper "compare" needs 2 parameters/);
  });

  it('compares types with typeof', function () {
    assert.equal(hbs.compile('{{#compare a "typeof" "string"}}yes{{else}}no{{/compare}}')({ a: 'x' }), 'yes');
  });
});
