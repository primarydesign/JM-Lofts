module.exports = function(array, value) {
  if (array instanceof Array) {
    return array.indexOf(value);
  }
}
