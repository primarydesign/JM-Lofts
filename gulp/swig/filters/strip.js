module.exports = function(input) {
  return input.toLowerCase().replace(/[,.]/g, '').replace(/(?![-])\W+/g, '_');
}
