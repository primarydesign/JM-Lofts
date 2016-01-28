let comparisons = {};
comparisons.equals = function(a, b) {
  return a === b;
}

module.exports = function(collection, property, value, type) {
  let store = [];
  for (let i = 0; i < collection.length; i++) {
    if (comparisons[type](collection[i][property], value)) store.push(collection[i]);
  }
  return store;
}
