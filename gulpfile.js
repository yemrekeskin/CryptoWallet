const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');

const browserSync = require('browser-sync').create()

var dir = {
  styleSrc : './src/styles/**/*.scss',
  styleDist : './dist/styles'
}

// TASK-1 : compile scss to css
function style() {
  return gulp.src(dir.styleSrc)
              .pipe(sass().on('error', sass.logError))
              .pipe(prefix())
              .pipe(gulp.dest(dir.styleDist)) 
              .pipe(browserSync.stream());              
}

// TASK-2 : watch html and scss file changes
function watch() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    }
  });

  gulp.watch(dir.styleSrc, style).on('change', browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;