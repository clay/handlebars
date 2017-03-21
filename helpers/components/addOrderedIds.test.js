'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{#each (addOrderedIds content "mock-prefix-")}}{{orderedId}}{{/each}}'),
  tplWithOffset = hbs.compile('{{#each (addOrderedIds content "mock-prefix-" 5)}}{{orderedId}}{{/each}}'),
  tplWithoutPrefix = hbs.compile('{{#each (addOrderedIds content)}}{{orderedId}}{{/each}}');

describe(name, function () {
  const content = [{
    _ref: 'localhost/components/fake/instances/1',
    text: 'hello'
  },{
    _ref: 'localhost/components/fake/instances/2',
    text: 'hola'
  },{
    _ref: 'localhost/components/fake/instances/3',
    text: 'bonjour'
  }];

  it('adds an orderedId property to all components in the list', function () {
    expect(tpl({content: content})).to.equal('mock-prefix-1mock-prefix-2mock-prefix-3');
  });

  it('adds an orderedId starting at an offset', function () {
    expect(tplWithOffset({content: content})).to.equal('mock-prefix-5mock-prefix-6mock-prefix-7');
  });

  it('throws an error if no prefix is passed in', function () {
    const resultWithoutPrefix = function () {
      return tplWithoutPrefix();
    };

    expect(resultWithoutPrefix).to.throw(Error);
  });

  it('throws an error if no content is passed in', function () {
    const result = function () {
      return tpl();
    };

    expect(result).to.throw(Error);
  });
});
