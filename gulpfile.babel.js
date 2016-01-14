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

const Uppsta = direque('./gulp' ,{recurse: true});
const Library = Uppsta.Library;
const $ = Uppsta.configure.paths;
const _ = Uppsta.Options;

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

gulp.task('pages', Pages);
gulp.task('styles', Styles);
gulp.task('scripts', Scripts);
