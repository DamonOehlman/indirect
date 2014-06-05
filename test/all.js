var test = require('tape');
var indirect = require('../');

test('can trigger an indirect call with no arguments', function(t) {
  var fn;

  t.plan(1);
  fn = indirect(function() {
    t.pass('function called');
  });

  fn();
});

require('./numeric-args');
require('./object-args');
