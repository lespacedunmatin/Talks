'use strict';

const gulp     = require('gulp');
const sass     = require('gulp-sass');
const maps     = require('gulp-sourcemaps');
const prefix   = require('gulp-autoprefixer');
const uglify   = require('gulp-uglify');
const rename   = require('gulp-rename');
const browser  = require('browser-sync').create();
const newer    = require('gulp-newer');

let paths = {
    dev: './accesslide/',
    node: './node_modules/'
};

gulp.task('sass', function () {
    return gulp.src(paths.dev + '/scss/*.scss')
      .pipe(newer(paths.dev + '/css'))
      .pipe(maps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(prefix({
          browsers: ['last 1 versions']
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(maps.write())
      .pipe(gulp.dest(paths.dest + '/css'))
      .pipe(browser.stream());
});


/**
 * @section Build
 * Compile JavaScript files for theme
 */
gulp.task('js', function () {
    return gulp.src(paths.dev + '/*.js')
      .pipe(newer(paths.dev + '/js'))
      .pipe(uglify().on('error', function(err) {
        console.error(`${err.cause.message} in ${err.cause.filename} at line ${err.cause.line}`);
        this.emit('end');
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.dest + '/js'))
      .pipe(browser.stream());
});


/**
 * @section Watch
 * Watch Sass and JavaScript files
 */
gulp.task('watch', function () {
    gulp.watch(paths.dev, ['sass', 'js']);
});


/**
 * @section Sync
 * BrowserSync
 */
gulp.task('sync', ['sass', 'js'], function() {
    browser.init({
        server: {
           baseDir: "./"
        }
    });

    gulp.watch(paths.dev + '/scss/**/*.scss', ['sass']);
    gulp.watch(paths.dev + '/js/**/*.js', ['js']);
});


/**
 * @section default: sync
 */
gulp.task('default', ['sync']);
