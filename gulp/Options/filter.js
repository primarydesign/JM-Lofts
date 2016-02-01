import filter from 'gulp-filter';

module.exports = filter('**/*.{html, swig}', {restore:true});
