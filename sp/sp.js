var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var paths = require('compass-options').paths();
var dirs = require('compass-options').dirs();
var browserSync = require('browser-sync');
var shell = require('gulp-shell');
var subtree = require('gulp-subtree');
var yaml = require('js-yaml');
var fs = require('fs');
var clean = require('gulp-clean');

var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');


var folderwalk = require('./exports.js').folderwalk;
var yamlJSON = require('./yaml-json.js').yaml2json;
var buildScope = require('./menu.js').buildScope;
var buildMenu = require('./menu.js').buildMenu;
var pagewalk = require('./pages.js').pagewalk;
var maid = require('./maid.js').maid;

module.exports = function (gulp) {
  gulp.task('pages', function () {
    gulp.src('pages/**/*.yml')
      .pipe(plumber())
      .pipe(yamlJSON())
      .pipe(gulp.dest('.tmp/pages'))
      .pipe(pagewalk())
      .pipe(browserSync.reload({stream:true}));
  });

  gulp.task('y2j', function () {
    gulp.src('pages/style-tile.yml')
      .pipe(yamlJSON())
      .pipe(gulp.dest('.www/pages'))
      .pipe(browserSync.reload({stream:true}));

    gulp.src('config/sections.yml')
      .pipe(yamlJSON())
      .pipe(gulp.dest('.www/config'))
      .pipe(buildMenu())
      .pipe(browserSync.reload({stream:true}));
  });

  gulp.task('bcc', function () {
    gulp.src('bower_components/**/*')
      .pipe(gulp.dest('.www/bower_components'));
  })

  //////////////////////////////
  // Begin Gulp Tasks
  //////////////////////////////
  gulp.task('lint', function () {
    return gulp.src([
        paths.js + '/**/*.js',
        '!' + paths.js + '/**/*.js'
      ])
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  });

  //////////////////////////////
  // Compass Task
  //////////////////////////////
  gulp.task('compass', function () {
    return gulp.src(paths.sass + '/**/*')
      .pipe(shell([
        'compass watch --time --css-dir=.www/' + dirs.css
      ]));
  });

  //////////////////////////////
  // Copies the partials over
  //////////////////////////////
  gulp.task('components', function () {
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

      watch({ glob: k + '/**/*.html' })
        .pipe(plumber())
        .pipe(maid({folder: k}))
        .pipe(folderwalk({
          'base': k
        }))
        .pipe(browserSync.reload({stream:true}));

      watch({ glob: k + '/**/*.yml' })
        .pipe(plumber())
        .pipe(yamlJSON())
        .pipe(gulp.dest('.tmp/scopes'))
        .pipe(buildScope())
        .pipe(browserSync.reload({stream:true}));
    });

    watch({ glob: 'pages/**/*.yml' })
      .pipe(plumber())
      .pipe(yamlJSON())
      .pipe(gulp.dest('.tmp/pages'))
      .pipe(browserSync.reload({stream:true}));
  });

  //////////////////////////////
  // Watches for changes to the tmp data and rebuilds the menus and files
  //////////////////////////////
  gulp.task('data', function () {
    watch({ glob: '.tmp/data/*.json'})
      .pipe(buildMenu())
      .pipe(browserSync.reload({stream:true}));
  });

  //////////////////////////////
  // Watch
  //////////////////////////////
  gulp.task('watch', function () {

    watch({ glob: dirs.js + '/**/*.js' })
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(gulp.dest('.www/' + dirs.js));

    watch({ glob: dirs.img + '/**/*'})
      .pipe(gulp.dest('.www/' + dirs.img));

    watch({ glob: '.www/' + dirs.fonts + '/**/*' })
      .pipe(gulp.dest('.www/' + dirs.fonts));

    watch({ glob: 'index.html' })
      .pipe(gulp.dest('.www/'));
  });

  // gulp.task('walk', function () {
  //   gulp.src('components')
  //     .pipe(folderwalk({
  //       'base': 'components'
  //     }))
  // });

  //////////////////////////////
  // BrowserSync Task
  //////////////////////////////
  gulp.task('browserSync', function () {
    browserSync.init([
      '.www/' + dirs.css +  '/**/*.css',
      '.www/' + dirs.js + '/**/*.js',
      '.www/' + dirs.img + '/**/*',
      '.www/' + dirs.fonts + '/**/*',
      '.www/**/*.html',
    ], {
      server: {
        baseDir: '.www'
      }
    });
  });

  //////////////////////////////
  // Server Tasks
  //////////////////////////////
  gulp.task('server', ['watch', 'components', 'data', 'compass', 'browserSync']);
  gulp.task('serve', ['server']);

  //////////////////////////////
  // Default Task
  //////////////////////////////
  gulp.task('default', ['server']);
}
