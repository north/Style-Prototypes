'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('compress', function () {
  gulp.src([
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-local-storate/angular-local-storage.js',
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