PromiseAllSync = {
  extend: function(PromiseClass) {
    var emptyPromise = PromiseClass.resolve || PromiseClass.when;
    PromiseClass.allSync = function(collection, fn, unfn) {
      var stack = [];
      return collection.reduce(function(promise, item) {
        return promise.then(function() {
          var nextPromise = fn ? fn(item) : item;
          return nextPromise.then(function() {
            if(unfn) stack.push(item);
          });
        });
      }, emptyPromise.apply(PromiseClass))
        .catch(function(e) {
          if(unfn) {
            stack.reduceRight(function(promise, item) {
              return promise.then(function() {
                return unfn(item);
              });
            }, emptyPromise.apply(PromiseClass));
          }
          return PromiseClass.reject(e);
        });
    }
  }
};