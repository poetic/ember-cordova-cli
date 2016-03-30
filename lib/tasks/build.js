'use strict';

var runCommand = require('../utils/run-command');
var Promise    = require('../ext/promise');
var fs         = require('fs-extra');
var path       = require('path');
var verifyDist = require('./verify-dist');
var remove     = Promise.denodeify(fs.remove);

module.exports = function(env, platform, project) {
  var cordovaOutputPath = path.join(project.root, 'cordova', 'www');
  var emberCommand = 'ember build --environment ' + env + ' --output-path ' + cordovaOutputPath;

  var emberMsg   = 'Building ember project for environment ' + env;
  var emberBuild = runCommand(emberCommand, emberMsg, {
    cwd: project.root
  });

  var cdvCommand = 'cordova build ' + platform;

  if (env !== 'development') {
    cdvCommand += ' --release'
  }

  var cdvMsg   = 'Building cordova project for platform ' + platform;
  var cdvBuild = runCommand(cdvCommand, cdvMsg, {
    cwd: path.join(project.root, 'cordova')
  });

  return function(){
    return remove(cordovaOutputPath)
            .then(emberBuild)
            .then(cdvBuild);
  };
};
