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

/**
 * @section Build
 * Compile JS & CSS files for theme
 */
 
gulp.task('css', function () {
    return gulp.src(paths.dev + '/scss/*.scss')
      .pipe(newer(paths.dev + '/css'))
      .pipe(maps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(prefix())
      .pipe(maps.write('./'))
      .pipe(gulp.dest(paths.dev + '/css'))
      .pipe(browser.stream());
});

gulp.task('js', function () {
    return gulp.src(paths.dev + '/*.js')
      .pipe(newer(paths.dev + '/js'))
      .pipe(uglify().on('error', function(err) {
        console.error(`${err.cause.message} in ${err.cause.filename} at line ${err.cause.line}`);
        this.emit('end');
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.dev + '/js'))
      .pipe(browser.stream());
});

gulp.task('build', gulp.parallel('css', 'js'));


/**
 * @section Sync
 * BrowserSync
 */
function reload(done) {
    browser.reload();
    done();
}

function sync(done) {
    browser.init({
      server: {
         baseDir: "./"
      },
      https: true,
      cors: true
    });
    done();
}

function watch() {
    gulp.watch('./**/*.html', gulp.series(reload));
    gulp.watch(paths.dev + '/scss/**/*.scss', gulp.series('css', reload));
    gulp.watch(paths.dev + '/*.js', gulp.series('js', reload));
}

exports.watch   = watch;
exports.default = gulp.series( 'build', sync, watch );
