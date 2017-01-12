'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ addCommas a }}');

describe(name, function () {
  it('fails gracefully', function () {
    expect(tpl({a: 'foo'})).to.equal('foo');
  });

  it('should pass through numbers that do not need commas', function () {
    expect(tpl({a: 123})).to.equal('123');
  });

  it('should pass through decimals (tens place) that do not need commas', function () {
    expect(tpl({a: 123.4})).to.equal('123.4');
  });

  it('should pass through decimals (hundreds place) that do not need commas', function () {
    expect(tpl({a: '123.40'})).to.equal('123.40'); // preserve zero by passing as a string
    expect(tpl({a: 123.45})).to.equal('123.45');
  });

  it('should add commas to intergers', function () {
    expect(tpl({a: 1234})).to.equal('1,234');
  });

  it('should add commas to decimals (tens place)', function () {
    expect(tpl({a: 1234.5})).to.equal('1,234.5');
  });

  it('should add commas to decimals (hundreds place)', function () {
    expect(tpl({a: 1234.56})).to.equal('1,234.56');
  });
});
