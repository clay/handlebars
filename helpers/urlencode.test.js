const name = getName(__filename);

describe(name, function () {
  // tests taken from the nunjucks filter tests
  it('encodes ampersands', function () {
    expect(hbs.compile('{{ urlencode "&" }}')()).to.equal('%26');
  });

  it('encodes arrays', function () {
    expect(hbs.compile('{{{ urlencode arr }}}')({arr: [[1,2],['&1','&2']]})).to.equal('1=2&%261=%262');
  });

  it('encodes objects', function () {
    expect(hbs.compile('{{{ urlencode obj }}}')({obj: {1: 2, '&1': '&2'}})).to.equal('1=2&%261=%262');
  });
});
