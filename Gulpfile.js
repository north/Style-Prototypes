'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var paths = require('compass-options').paths();
var dirs = require('compass-options').dirs();
var browserSync = require('browser-sync');
var shell = require('gulp-shell');


var walk = require('walk');
var jf = require('jsonfile');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

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
      'compass watch --time'
    ]));
});

//////////////////////////////
// Watch
//////////////////////////////
gulp.task('watch', function () {
  watch({ glob: dirs.js + '/**/*.js'},
    function (files) {
      return files.pipe(jshint())
        .pipe(jshint.reporter(stylish))
    }
  );
});
// gulp.task('watch', function () {
//   watch({
//     glob: paths.js + '/**/*.js'
//   })
//     .pipe(jshint())
//     .pipe(jshint.reporter(stylish))
//   // gulp.src(paths.js + '/**/*.js')
//   //   .pipe(watch(function (files) {
//   //     return files.pipe(lint());
//   //   }));

//   // gulp.watch(paths.js + '/**/*.js', ['lint']);
//   // gulp.watch(paths.html + '/components/**/*.html', ['walk']);
// });

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

//////////////////////////////
// Default Task
//////////////////////////////
gulp.task('default', ['server']);

//////////////////////////////
// Walk
//////////////////////////////
gulp.task('walk', function () {
  var files = [];
  var walker = walk.walk('components');

  walker.on('file', function(root, stat, next) {
    var fileName = stat.name;
        fileName = fileName.replace('.html', '');
    var filePath = root + '/' + stat.name;
    var fileRoot = root.replace('components', '');
        fileRoot = fileRoot.charAt(0) === '/' ? fileRoot.substr(1) : fileRoot;
    var file = {
      "name": fileName,
      "path": filePath,
      "root": fileRoot
    };

    files.push(file);
    next();
  });

  walker.on('end', function () {
    jf.writeFile('./data/page.json', files, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Wrote page.json');
      }
    });
  });

});