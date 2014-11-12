'use strict';

var path       = require('path');
var runCommand = require('../utils/run-command');
var Promise    = require('../ext/promise');

module.exports = function(version, options, project) {
  var config    = project.cordovaConfig;
  var updateXml = function() { return Promise.resolve(); };
  var environment = options.environment || 'development';

  if (version) {
    updateXml = require('./update-config-xml-version')(version, project, environment);
  }

  var build   = require('./build')(environment, 'ios', project);

  var iosPath        = path.join(project.root, 'cordova', environment, 'platforms/ios');
  var archiveCommand = 'xcodebuild -scheme ' + config.name + ' archive';
  var archiveProject = runCommand(archiveCommand, 'Archiving project with xcodebuild', {
    cwd: iosPath
  });

  var commitCommand = 'git add . && git commit -m "archive version: '
                      + version + '"';
  var commitProject = runCommand(commitCommand, 'Commiting changes', {
    cwd: project.root
  });

  var tagCommand = 'git tag -a -m "' + 'Version ' + version + '" ' + version;
  var tagProject = runCommand(tagCommand, 'Tagging with version ' + version, {
    cwd: project.root
  });

  return function() {
    var promises = updateXml().then(build).then(archiveProject);

    if (options.commit && options.tag) {
      promises.then(commitProject).then(tagProject);
    } else {
      if (options.commit) {
        promises.then(commitProject)
      } else if (options.tag) {
        promises.then(tagProject);
      }
    }

    return promises;
  }
};
