var haveDoc = typeof document != 'undefined';
var haveCustomEvent = typeof CustomEvent != 'undefined';
var enabled = haveDoc;

/**
  # indirect

  A module for working around limitations where a native code -> JS invocation
  engine is only able to execute code against the global scope of the JS
  execution environment.

  ## How it works

  The `indirect` module uses a uniquely named
  [CustomEvent](https://developer.mozilla.org/en/docs/Web/API/CustomEvent) to
  assist the native calling code to only have to operate within global scope.
  The listener for the custom event then replays the execution with the
  original arguments against a continuation function which was originally
  passed to `indirect`.

  ## Example Usage

  To be completed.

**/

var indirect = module.exports = function(cont) {
  if (! enabled) {
    return cont;
  }

  return function() {
    var args = [].slice.call(arguments);

    if (! haveDoc) {
      return setTimeout(function() {
        cont.apply(null, args);
      }, 0);
    }
  };
};

indirect.disable = function() {
  enabled = false;
  return indirect;
};

indirect.enable = function() {
  enabled = haveDoc;
  return indirect;
};
