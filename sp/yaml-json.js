'use strict';
var es = require('event-stream');
var gutil = require('gulp-util');
var yaml = require('js-yaml');
var jf = require('jsonfile');
var chalk = require('chalk');

module.exports.yaml2json = function (options) {
  return es.map(function (gulpFile, cb) {
    gulpFile._contents = new Buffer(JSON.stringify(yaml.safeLoad(gulpFile._contents.toString('utf-8'))));
    gulpFile.path = gutil.replaceExtension(gulpFile.path, '.json');
    return cb(null, gulpFile);
  });
}