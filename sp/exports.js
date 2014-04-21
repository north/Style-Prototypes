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

  if (name.charAt(0) === '.' || name === '') {
    return {
      skip: true,
      path: path.basename(filename)
    };
  }
  name = name.replace('.html', '');

  var base = filename.replace(path.basename(filename), '').split('/')[2];

  var menuName = name.replace(/--/g, '|&&|');
      menuName = menuName.replace(/-/g, ' ');
      menuName = menuName.replace(/\|\&\&\|/g, ' - ');
      menuName = _s.titleize(menuName);

  var stats = fs.lstatSync(filename),
      info = {
        title: menuName
      };

  var group = filename.replace(path.basename(filename), '');
      group = group.split('/');
      group = group.splice(3, group.length - 4);
      // console.log(group);
      // console.log('-------------');
      group = group.join('-');

  if (stats.isDirectory()) {
    group = filename.split('/').splice(3).join('-');
    // console.log(group);
    // console.log('-------------');

    // info.type = "folder";
    info.submenu = fs.readdirSync(filename).map(function(child) {
      return dirTree(filename + '/' + child);
    });


    if (group === '') {
      info.submenu.push({
        title: 'View All',
        href: '#/' + filename.split('/').splice(2).join('-')
      });
    }
    else {
      info.submenu.push({
        title: 'View All',
        href: '#/' + base + '?group=' + group
      });
    }
  } else {
      if (path.basename(filename).indexOf('.html') === -1) {
        return {
          skip: true,
          path: path.basename(filename)
        };
    }

    // console.log(group);
    // console.log(name);
    // console.log('-------------');

    var id = group + '--' + name;
        id = id.indexOf('--') === 0 ? id.substr(2) : id;
    info.href = '#/' + base + '?id=' + id;
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
    var partials = '.www/partials/' + base;
    var files = [];
    var folders = [];
    var walker = walk.walk(partials);

    walker.on('file', function(root, stat, next) {

      var fileName = stat.name;
          fileName = fileName.replace('.html', '');
      var fileTitle = fileName.replace(/--/g, '|&&|');
          fileTitle = fileTitle.replace(/-/g, ' ');
          fileTitle = fileTitle.replace(/\|\&\&\|/g, ' - ');
          fileTitle = _s.titleize(fileTitle);
      var filePath = root + '/' + stat.name;
          filePath = filePath.replace('.www/', '');
      var fileRoot = root.charAt(0) === '/' ? root.substr(1) : root;
      var fileId = fileRoot.split('/').splice(3).join('-') + '--' + fileName;
          fileId = fileId.indexOf('--') === 0 ? fileId.substr(2) : fileId;

      var file = {
        "name": fileName,
        "title": fileTitle,
        "id": fileId,
        "path": filePath,
        "group": fileRoot.split('/').splice(3).join('-')
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
        "menu": [dirTree(partials)]
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

