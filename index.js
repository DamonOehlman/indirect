var haveDoc = typeof document != 'undefined';
var haveCustomEvent = typeof CustomEvent != 'undefined';
var enabled = true;

var indirect = module.exports = function(callback) {
  return function() {
    var args = [].slice.call(arguments);

    if (! haveDoc) {
      return setTimeout(function() {
        callback.apply(null, args);
      }, 0);
    }
  };
};

indirect.disable = function() {
  enabled = false;
  return indirect;
};

indirect.enable = function() {
  enabled = true;
  return indirect;
};
