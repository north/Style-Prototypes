'use strict';
var es = require('event-stream');
var gutil = require('gulp-util');
var walk = require('walk');
var jf = require('jsonfile');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var _s = require ('underscore.string');
var util = require('util');

var dirTree = function (filename) {
  var name = path.basename(filename);

  if (name.charAt(0) === '.') {
    return {
      skip: true,
      path: path.basename(filename)
    };
  }

  name = name.replace('.html', '');

  var menuName = name.replace(/--/g, '|&&|');
      menuName = menuName.replace(/-/g, ' ');
      menuName = menuName.replace(/\|\&\&\|/g, ' - ');
      menuName = _s.titleize(menuName);



  var stats = fs.lstatSync(filename),
      info = {
        title: menuName
      };

  if (stats.isDirectory()) {
    // info.type = "folder";
    info.submenu = fs.readdirSync(filename).map(function(child) {
      return dirTree(filename + '/' + child);
    });

    info.submenu.push({
      title: 'View All',
      href: '#/' + filename
    });
  } else {
      if (path.basename(filename).indexOf('.html') === -1) {
        return {
          skip: true,
          path: path.basename(filename)
        };
    }

    info.href = '#/?id=' + path.dirname(filename).replace(/\//g, '-') + '--' + name;
      // Assuming it's a file. In real life it could be a symlink or
      // something else!
  }



  return info;

}

var folderwalk = function (options) {
  // Make sure Data folder is available
  if (!fs.existsSync('.www')) {
    fs.mkdirSync('.www');
  }
  if (!fs.existsSync('.www/data')) {
    fs.mkdirSync('.www/data');
  }

  return es.map(function (gulpFile, cb) {
    if (options === undefined && options.base === undefined) {
      return cb(
        new gutil.PluginError("gulp-folderwalk", "Folder Walk must be called with a base folder to walk"),
        gulpFile
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
      var fileTitle = fileName.replace(/--/g, '|&&|');
          fileTitle = fileTitle.replace(/-/g, ' ');
          fileTitle = fileTitle.replace(/\|\&\&\|/g, ' - ');
          fileTitle = _s.titleize(fileTitle);
      var filePath = root + '/' + stat.name;
      var fileRoot = root.charAt(0) === '/' ? root.substr(1) : root;
      var fileId = fileRoot.replace(/\//g, '-') + '--' + fileName;

      var file = {
        "name": fileName,
        "title": fileTitle,
        "id": fileId,
        "path": filePath,
        "root": fileRoot
      };

      if (folders.indexOf(fileRoot) === -1) {
        folders.push(fileRoot);
      }

      // Ignore Dot Files
      if (fileName.charAt(0) !== '.' && stat.name.indexOf('.html') > -1) {
        files.push(file);
      }
      next();
    });

    walker.on('end', function () {

      var build = {
        "files": files,
        "folders": folders,
        "menu": [dirTree(base)]
      };

      jf.writeFile(fileName, build, function(err) {
        if (err) {
          return cb(
            new gutil.PluginError("gulp-folderwalk", err),
            gulpFile
          );
        }
        else {
          gutil.log('Wrote ' + chalk.magenta(fileName));
          return cb(null, gulpFile);
        }
      });
    });
  });
};

module.exports.folderwalk = function (options) {
  return folderwalk(options);
}

