import Path from 'path';
module.exports = function(file) {
  return { page: Path.basename(file.path, '.html') }
}
