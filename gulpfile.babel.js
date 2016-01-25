import gulp from 'gulp';
import direque from 'require-dir';
/* source processing */
import data from 'gulp-data';
import swig from 'gulp-swig';
import named from 'vinyl-named';
import webpack from 'gulp-webpack';
import postcss from 'gulp-postcss';
import cssnano from 'gulp-cssnano';
import htmlmin from 'gulp-htmlmin';
import cached from 'gulp-cached';
import imagemin from 'gulp-imagemin';
import bsync from 'browser-sync';
import pretty from 'gulp-pretty-url';

var Uppsta = direque('./gulp' ,{recurse: true});
var Library = Uppsta.Library;
var Browser = bsync.create();
var $ = Uppsta.configure.paths;
var _ = Uppsta.Options;

gulp.task('pages', function() {
  return gulp.src($.pages.globs)
  .pipe(data(_.data))
  .pipe(swig(_.swig()))
  .pipe(pretty())
  .pipe(htmlmin(_.htmlmin))
  .pipe(gulp.dest($.pages.dest))
  .pipe(Browser.stream());
});

gulp.task('styles', function() {
  return gulp.src($.css.globs)
  .pipe(postcss(_.postcss))
  .pipe(cssnano(_.cssnano))
  .pipe(gulp.dest($.css.dest))
  .pipe(Browser.stream());
});

gulp.task('scripts', function() {
  return gulp.src($.js.globs)
  .pipe(named())
  .pipe(webpack(_.webpack))
  .pipe(gulp.dest($.js.dest))
  .pipe(Browser.stream());
});

gulp.task('images', function() {
  return gulp.src($.img.globs)
  .pipe(cached())
  .pipe(imagemin())
  .pipe(gulp.dest($.img.dest))
  .pipe(Browser.stream());
});

gulp.task('watch', function() {
  Browser.init(_.browsersync);
	gulp.watch($.pages.watch, ['pages']);
  gulp.watch($.css.watch, ['styles']);
  gulp.watch($.js.watch, ['scripts']);
  gulp.watch($.img.watch, ['images']);
});
