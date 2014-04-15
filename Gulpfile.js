'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var paths = require('compass-options').paths();
var browserSync = require('browser-sync');
var shell = require('gulp-shell');

//////////////////////////////
// Begin Gulp Tasks
//////////////////////////////
gulp.task('lint', function () {
  return gulp.src([
      paths.js + '/**/*.js',
      '!' + paths.js + '/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});

//////////////////////////////
// Compass Task
//////////////////////////////
gulp.task('compass', function () {
  return gulp.src(paths.sass + '/**/*')
    .pipe(shell([
      'bundle exec compass watch --time'
    ]));
});

//////////////////////////////
// Watch
//////////////////////////////
gulp.task('watch', function () {
  gulp.watch(paths.js + '/**/*.js', ['lint']);
});

//////////////////////////////
// BrowserSync Task
//////////////////////////////
gulp.task('browserSync', function () {
  browserSync.init([
    paths.css +  '/**/*.css',
    paths.js + '/**/*.js',
    paths.img + '/**/*',
    paths.fonts + '/**/*',
    paths.html + '/**/*.html',
  ], {
    server: {
      baseDir: paths.html
    }
  });
});

//////////////////////////////
// Server Tasks
//////////////////////////////
gulp.task('server', ['watch', 'compass', 'browserSync']);
gulp.task('serve', ['server']);
