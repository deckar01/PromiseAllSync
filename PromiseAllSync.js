PromiseAllSync = {
  extend: function(PromiseClass) {
    PromiseClass.allSync = function(collection, fn, unfn) {
      var stack = [];
      return collection.reduce(function(promise, item) {
        return promise.then(function() {
          var nextPromise = fn ? fn(item) : item;
          return nextPromise.then(function() {
            if(unfn) stack.push(item);
          });
        });
      }, PromiseClass.resolve())
        .catch(function(e) {
          if(unfn) while(stack.length) unfn(stack.pop());
          return PromiseClass.reject(e);
        });
    }
  }
};