'use strict';
const name = getName(__filename),
  filter = require('./' + name);

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
    expect(filter(content, 'mock-prefix-')).to.deep.equal([{
      _ref: 'localhost/components/fake/instances/1',
      text: 'hello',
      orderedId: 'mock-prefix-1'
    },{
      _ref: 'localhost/components/fake/instances/2',
      text: 'hola',
      orderedId: 'mock-prefix-2'
    },{
      _ref: 'localhost/components/fake/instances/3',
      text: 'bonjour',
      orderedId: 'mock-prefix-3'
    }]);
  });

  it('adds an orderedId starting at an offset', function () {
    expect(filter(content, 'mock-prefix-', 10)).to.deep.equal([{
      _ref: 'localhost/components/fake/instances/1',
      text: 'hello',
      orderedId: 'mock-prefix-10'
    },{
      _ref: 'localhost/components/fake/instances/2',
      text: 'hola',
      orderedId: 'mock-prefix-11'
    },{
      _ref: 'localhost/components/fake/instances/3',
      text: 'bonjour',
      orderedId: 'mock-prefix-12'
    }]);
  });

  it('always returns an array', function () {
    expect(filter(null)).to.deep.equal([]);
  });
});
