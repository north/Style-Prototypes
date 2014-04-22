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

    sections.forEach(function (k) {
      var path = '.www/data/'+ k + '.json';
      if (fs.existsSync(path)) {
        var data = jf.readFileSync(path);
        menu.push(data.menu[0]);
      }
    });

    jf.writeFileSync('.www/config/menu.json', menu);

    return cb(null, gulpFile);
  });
}