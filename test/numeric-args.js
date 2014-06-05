var test = require('tape');
var indirect = require('../');

test('can trigger an indirect with 1 numeric argument', function(t) {
  var fn;

  t.plan(1);
  fn = indirect(function(val) {
    t.equal(val, 5);
  });

  fn(5);
});

test('can trigger an indirect with 2 numeric arguments', function(t) {
  var fn;

  t.plan(2);
  fn = indirect(function(a, b) {
    t.equal(a, 5);
    t.equal(b, 7);
  });

  fn(5, 7);
});
