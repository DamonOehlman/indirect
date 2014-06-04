var haveDoc = typeof document != 'undefined';
var haveCustomEvent = typeof CustomEvent != 'undefined';
var enabled = haveDoc;
var eventNS = Math.random().toString(36).slice(2);
var eventCounter = 0;

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

var indirect = module.exports = function(cont, scope) {
  var eventName;

  function handleEvent(evt) {
    var args = evt && evt.detail;
    if (Array.isArray(args)) {
      cont.apply(scope, args);
    }

    // TODO: deregister event listener at the appropriate time otherwise memory leak
  }

  if (! enabled) {
    return cont;
  }

  // initialise the new eventName
  eventName = eventNS + ':' + (eventCounter++);
  document.addEventListener(eventName, handleEvent);

  return function() {
    var args = [].slice.call(arguments);
    var evt;

    if (haveCustomEvent) {
      evt = new CustomEvent(eventName, {
        detail: args
      });
    }

    if (evt) {
      document.dispatchEvent(evt);
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
