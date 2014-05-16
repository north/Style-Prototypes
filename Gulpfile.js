'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var shell = require('gulp-shell');

gulp.task('compress', function () {
  gulp.src([
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-local-storage/angular-local-storage.js',
    'bower_components/prism/prism.js',
    'bower_components/prism/components/prism-scss.js',
    'bower_components/prism/components/prism-javascript.js',
    'build/templates.js',
    'build/factories.js',
    'build/directives.js',
    'build/app.js'
  ])
  .pipe(concat('style-prototype.js'))
  .pipe(uglify({
    mangle: true,
    outSourceMap: true
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('compass', function () {
  return gulp.src('sass/**/*')
    .pipe(shell([
      'bundle exec compass compile --force'
    ]));
});

gulp.task('default', ['compress', 'compass']);