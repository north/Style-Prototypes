'use strict';
var es = require('event-stream');
var gutil = require('gulp-util');
var walk = require('walk');
var jf = require('jsonfile');
var chalk = require('chalk');
var fs = require('fs');

var folderwalk = function (options) {
  // Make sure Data folder is available
  if (!fs.existsSync('.www')) {
    fs.mkdirSync('.www');
  }
  if (!fs.existsSync('.www/data')) {
    fs.mkdirSync('.www/data');
  }

  return es.map(function (file, cb) {
    if (options === undefined && options.base === undefined) {
      return cb(
        new gutil.PluginError("gulp-folderwalk", "Folder Walk must be called with a base folder to walk"),
        file
      );
    }

    var base = options.base;
    var fileName = '.www/data/' + base + '.json';
    var files = [];
    var folders = [];
    var walker = walk.walk(base);

    walker.on('file', function(root, stat, next) {
      var fileName = stat.name;
          fileName = fileName.replace('.html', '');
      var filePath = root + '/' + stat.name;
      var fileRoot = root.replace(base, '');
          fileRoot = fileRoot.charAt(0) === '/' ? fileRoot.substr(1) : fileRoot;
      var file = {
        "name": fileName,
        "path": filePath,
        "root": fileRoot
      };

      // Ignore Dot Files
      if (fileName.charAt(0) !== '.') {
        files.push(file);
      }
      next();
    });

    walker.on('end', function () {
      for (var i in files) {
        var folder = files[i].root;
        if (folders.indexOf(folder) === -1)  {
          folders.push(folder);
        }
      }

      var build = {
        "files": files,
        "folders": folders
      };

      jf.writeFile(fileName, build, function(err) {
        if (err) {
          return cb(
            new gutil.PluginError("gulp-folderwalk", err),
            file
          );
        }
        else {
          gutil.log('Wrote ' + chalk.magenta(fileName));
          return cb(null, file);
        }
      });
    });
  });
};

module.exports.folderwalk = function (options) {
  return folderwalk(options);
}