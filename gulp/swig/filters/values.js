module.exports = function(collection, propertyName) {
  let store = [];
  for(let i = 0; i < collection.length; i++) {
    let value = collection[i][propertyName];
    if (store.indexOf(value) === -1 & value !== "master") {
      store.push(value);
    }
  }
  return store;
}
