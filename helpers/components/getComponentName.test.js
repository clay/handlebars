'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ getComponentName a }}');

describe(name, function () {
  it('gets name from default reference', function () {
    expect(tpl({ a: 'domain.com/components/foo'})).to.equal('foo');
  });

  it('gets name from instance reference', function () {
    expect(tpl({ a: 'domain.com/components/foo/instances/bar'})).to.equal('foo');
  });
});
