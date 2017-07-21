'use strict';
const name = getName(__filename),
  filterName = __filename.split('/').pop().split('.').shift(),
  filter = require('./' + filterName);

describe(name, function () {
  it('adds aria-describedby with incremented id', function () {
    expect(filter([
      {
        _ref: 'localhost/components/clay-paragraph/instances/1',
        text: '<span class=\"clay-annotated kiln-phrase\">hello</span>'
      },
      {
        _ref: 'localhost/components/clay-paragraph/instances/2',
        text: 'nothing annotated here'
      },
      {
        _ref: 'localhost/components/clay-paragraph/instances/3',
        text: '<span class=\"clay-annotated kiln-phrase\">hola</span>'
      },
      {
        _ref: 'localhost/components/clay-annotated/instances/1',
        text: 'yay'
      },
      {
        _ref: 'localhost/components/clay-annotated/instances/2',
        text: 'yay2'
      }
    ])).to.deep.equal([
      {
        _ref: 'localhost/components/clay-paragraph/instances/1',
        text: '<span class=\"clay-annotated kiln-phrase\" aria-describedby="annotation-1" tabindex="0">hello</span>'
      },
      {
        _ref: 'localhost/components/clay-paragraph/instances/2',
        text: 'nothing annotated here'
      },
      {
        _ref: 'localhost/components/clay-paragraph/instances/3',
        text: '<span class=\"clay-annotated kiln-phrase\" aria-describedby="annotation-2" tabindex="0">hola</span>'
      },
      {
        _ref: 'localhost/components/clay-annotated/instances/1',
        text: 'yay'
      },
      {
        _ref: 'localhost/components/clay-annotated/instances/2',
        text: 'yay2'
      }
    ]);
  });

  it('always returns an array', function () {
    expect(filter(null)).to.deep.equal([]);
  });
});
