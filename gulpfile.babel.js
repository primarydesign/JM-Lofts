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
import inline from 'gulp-inline';
import pretty from 'gulp-pretty-url';
import replace from 'gulp-replace';

var Uppsta = direque('./gulp' ,{recurse: true});
var Library = Uppsta.Library;
var Browser = bsync.create();
var $ = Uppsta.configure.paths;
var _ = Uppsta.Options;

gulp.task('assets', function() {
  return gulp.src($.assets.globs)
  .pipe(gulp.dest($.assets.dest));
});

gulp.task('pages', function() {
  gulp.src(['./src/templates/{navbar,footer}.html'])
  .pipe(data(_.data))
  .pipe(swig(_.swig()))
  .pipe(inline(_.inline))
  .pipe(htmlmin(_.htmlmin))
  .pipe(gulp.dest($.assets.dest));
  return gulp.src($.pages.globs)
  .pipe(data(_.data))
  .pipe(swig(_.swig()))
  .pipe(pretty())
  .pipe(htmlmin(_.htmlmin))
  .pipe(gulp.dest($.pages.dest))
  .pipe(Browser.stream());
});

gulp.task('styles', function() {
  let siteURL = require('./src/assets/_data/site').url;
  return gulp.src($.css.globs)
  .pipe(postcss(_.postcss))
  .pipe(replace(/__SITEURL__/g, siteURL))
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

gulp.task('build', ['pages','assets','styles','scripts','images'], function() {});

gulp.task('watch', function() {
  Browser.init(_.browsersync);
  gulp.watch($.assets.watch, ['assets']);
	gulp.watch($.pages.watch, ['pages']);
  gulp.watch($.css.watch, ['styles']);
  gulp.watch($.js.watch, ['scripts']);
  gulp.watch($.img.watch, ['images']);
});
