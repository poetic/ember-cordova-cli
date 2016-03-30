var path       = require('path');
var runCommand = require('../utils/run-command');
var Promise    = require('../ext/promise');

module.exports = {
  name: 'cordova:prepare',
  aliases: ['cdv:prepare'],
  description: 'Needed after cloning or copying a project.',
  works: 'insideProject',

  run: function() {
    var installDeps = runCommand('npm install && bower install', 'Installing npm and bower dependencies', {
      cwd: this.project.root
    });

    return Promise.all([installDeps()]);
  }
};
