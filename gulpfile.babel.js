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

var Uppsta = direque('./gulp' ,{recurse: true});
var Library = Uppsta.Library;
var Browser = bsync.create();
var $ = Uppsta.configure.paths;
var _ = Uppsta.Options;

function Pages() {
  return gulp.src($.pages.globs)
  .pipe(data(_.data))
  .pipe(swig(_.swig()))
  .pipe(htmlmin(_.htmlmin))
  .pipe(gulp.dest($.pages.dest));
}

function Styles() {
  return gulp.src($.css.globs)
  .pipe(postcss(_.postcss))
  .pipe(cssnano(_.cssnano))
  .pipe(gulp.dest($.css.dest));
}

function Scripts() {
  return gulp.src($.js.globs)
  .pipe(named())
  .pipe(webpack(_.webpack))
  .pipe(gulp.dest($.js.dest));
}

function Images() {
  return gulp.src($.img.globs)
  .pipe(cached())
  .pipe(imagemin())
  .pipe(gulp.dest($.img.dest));
}

function Watch() {
  Browser.init(_.browsersync);
	gulp.watch($.pages.globs, Pages);
  gulp.watch($.css.globs, Styles);
  gulp.watch($.js.globs, Scripts);
  gulp.watch($.img.globs, Images);
}

gulp.task('pages', Pages);
gulp.task('styles', Styles);
gulp.task('scripts', Scripts);
gulp.task('images', Images);
gulp.task('watch', Watch);
