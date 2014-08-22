PromiseAllSync
==============

Extend JavaScript promises with synchronous transactions.

```Promise.allSync``` provides a synchronous version of ```Promise.all``` that stops if a promise is rejected and provides the ability to roll back the changes that were applied.

Setup:
------

Extend your existing promise library with ```allSync```. Any library that supports ```Promise.resolve()``` (or ```Promise.when()```) and ```Promise.prototype.then()``` can be used.

```javascript
PromiseAllSync.extend(Promise);
PromiseAllSync.extend(Q);
PromiseAllSync.extend(BlueBird);
```

Usage:
------

```javascript
/**
 * Process a collection of promises in order and stops on the first rejected promise.
 * Provides the ability to roll back previous operations if one fails.
 * 
 * @param {Array} collection An array of functions resolved in order or an array of objects
 *     to process in order.
 * @param {Function} [fn] The optional callback used to process each item from collection.
 * @param {Function} [unfn] The optional callback used to reverse the operation on items
 *     processed before one of the promises was rejected. The items are supplied LIFO
 *     to support rolling back order dependent operations.
 */
Promise.allSync(collection, [fn, [unfn]]);
```

**Synchronously resolve a collection of functions:**
```javascript
Promise.allSync([function1, function2, ...]);
```

**Synchronously process a collection of objects:**
```javascript
Promise.allSync([object1, object2, ...], fn);
```

**Synchronously process a collection of objects and roll back in the event that one of the promises is rejected:**
```javascript
Promise.allSync([object1, object2, ...], fn, unfn);
```
