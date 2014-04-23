'use strict';
var es = require('event-stream');
var yaml = require('js-yaml');
var fs = require('fs-extra');
var gutil = require('gulp-util');

module.exports.maid = function (options) {
  return es.map(function (gulpFile, cb) {
    var folder = options.folder;
    var sections = yaml.safeLoad(fs.readFileSync('./config/sections.yml', 'utf8'));


    if (fs.existsSync('.www/partials/' + folder)) {
      fs.removeSync('.www/partials/' + folder);
      gutil.log('埽', 'The Maid has cleaned');
    }

    // Make Partial folder
    fs.mkdirSync('.www/partials/' + folder);

    // Import Plugins
    if (sections[folder].plugins) {
      sections[folder].plugins.forEach(function (p) {
        fs.copySync(p, '.www/partials/' + folder)
      });
      gutil.log('埽', 'The Maid has replaced the plugins');
    }

    // Import User Files
    // (do this second so user versions take precedence)
    fs.copySync(folder, '.www/partials/' + folder);
    gutil.log('埽', 'The Maid has updated the files');




    return cb(null, gulpFile);
  });
}