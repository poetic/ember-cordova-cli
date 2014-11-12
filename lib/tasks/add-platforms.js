'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = function(project, options, env) {
  var command = 'cordova platform add ' + options.platform;

  return runCommand(command, 'Adding ' + options.platform + ' platform to cordova/' + env, {
    cwd: path.join(project.root, 'cordova', env)
  });
};
