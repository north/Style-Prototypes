'use strict';
var es = require('event-stream');
var gutil = require('gulp-util');
var jf = require('jsonfile');
var chalk = require('chalk');
var fs = require('fs');

module.exports.buildMenu = function (options) {
  return es.map(function (gulpFile, cb) {
    var sections = Object.keys(jf.readFileSync('.www/config/sections.json'));

    var menu = [];
    var files = {};

    sections.forEach(function (k) {
      var path = '.tmp/data/'+ k + '.json';
      if (fs.existsSync(path)) {
        try {
          var data = jf.readFileSync(path);
          menu.push(data.menu[0]);
          files[k] = data.files;
        }
        catch (e) {
          console.log(e);
        }
      }
    });

    jf.writeFileSync('.www/config/menu.json', menu);
    jf.writeFileSync('.www/config/files.json', files);

    return cb(null, gulpFile);
  });
}