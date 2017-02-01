'use strict';
const name = getName(__filename);

describe(name, function () {
  it('should stringify an object', function () {
    expect(hbs.compile('{{{ stringify obj }}}')({ obj: {a: 'b'} })).to.equal('{"a":"b"}');
  });
});
