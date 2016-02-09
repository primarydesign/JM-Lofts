import filter from 'gulp-filter';

module.exports = filter(['*', '!**/*.sprites.svg'], {restore: true});
