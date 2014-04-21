var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var paths = require('compass-options').paths();
var dirs = require('compass-options').dirs();
var browserSync = require('browser-sync');
var shell = require('gulp-shell');
var subtree = require('gulp-subtree');
var yaml = require('js-yaml');
var fs = require('fs');



var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');


var folderwalk = require('./exports.js').folderwalk;

module.exports = function (gulp) {
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

  gulp.task('plugins', function () {
    var sections = yaml.safeLoad(fs.readFileSync('./config/sections.yml', 'utf8'));

    Object.keys(sections).forEach(function (k) {
      var dest = '.www/partials/' + k;
      if (!fs.existsSync('.www')) {
        fs.mkdirSync('.www');
      }
      if (!fs.existsSync('.www/partials')) {
        fs.mkdirSync('.www/partials');
      }
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }

      watch({ glob: k + '/**/*.html'})
        .pipe(gulp.dest(dest))
        .pipe(folderwalk({
          'base': k
        }));

      if (sections[k].plugins) {
        sections[k].plugins.forEach(function (p) {
          gulp.src(p + '/**/*.html')
            .pipe(gulp.dest(dest))
            .pipe(folderwalk({
              'base': k
            }));
        });
      }

    });
  });

  //////////////////////////////
  // Watch
  //////////////////////////////
  gulp.task('watch', function () {

    watch({ glob: dirs.js + '/**/*.js' })
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(gulp.dest('.www/' + dirs.js));

    watch({ glob: 'base/**/*.html'})
      .pipe(folderwalk({
        'base': 'base'
      }))
      .pipe(gulp.dest('.www/base'))
      .pipe(browserSync.reload({stream: true}));

    watch({ glob: 'components/**/*.html'})
      .pipe(folderwalk({
        'base': 'components'
      }))
      .pipe(gulp.dest('.www/components'))
      .pipe(browserSync.reload({stream: true}));

    watch({ glob: 'layouts/**/*.html'})
      .pipe(folderwalk({
        'base': 'layouts'
      }))
      .pipe(gulp.dest('.www/layouts'))
      .pipe(browserSync.reload({stream: true}));
  });

  gulp.task('walk', function () {
    gulp.src('components')
      .pipe(folderwalk({
        'base': 'components'
      }))
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

  //////////////////////////////
  // Default Task
  //////////////////////////////
  gulp.task('default', ['server']);
}
