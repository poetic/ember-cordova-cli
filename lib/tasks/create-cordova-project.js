'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = function(project, env) {
  var config  = project.cordovaConfig;
  var command = 'cordova create ' + env + ' ' + config.id + ' ' + config.name;

  return runCommand(command, 'Creating Cordova project for "' + env + '" environment.', {
    cwd: path.join(project.root, 'cordova')
  });

};
