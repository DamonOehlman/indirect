var test = require('tape');
var indirect = require('../');

test('can trigger an indirect with 1 object argument', function(t) {
  var fn;

  t.plan(1);
  fn = indirect(function(val) {
    t.deepEqual(val, { a: 5 });
  });

  fn({ a: 5 });
});

test('can trigger an indirect with 2 object arguments', function(t) {
  var fn;

  t.plan(2);
  fn = indirect(function(a, b) {
    t.deepEqual(a, { value: 5 });
    t.deepEqual(b, { value: 7, debug: false });
  });

  fn({ value: 5 }, { value: 7, debug: false });
});
