'use strict';
var runCommand = require('../utils/run-command');

module.exports = function(project) {

  var command = 'mkdir cordova';

  return runCommand(
    command,
    "Creating folder 'cordova' to contain your environment based projects.",
    {
      cwd: project.root
    });
};
