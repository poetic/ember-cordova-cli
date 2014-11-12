'use strict';

var Promise        = require('../ext/promise');
var path           = require('path');
var runCommand     = require('../utils/run-command');
var getOpenCommand = require('../utils/open');

module.exports = function(project, env, platform, application) {
  var projectPath, command;
  if (platform === 'ios') {
    projectPath = path.join(project.root, 'cordova', env, 'platforms/ios/*.xcodeproj');
  } else if (platform === 'android') {
    projectPath = path.join(project.root, 'cordova', env, 'platforms/android/.project');
  } else {
    return Promise.reject(new Error('The ' + platform + ' platform is not supported. Please use "ios" or "android"'));
  }

  var command = getOpenCommand(projectPath, application);

  return runCommand(command, 'Opening ' + platform + ' project with the default application');
};
