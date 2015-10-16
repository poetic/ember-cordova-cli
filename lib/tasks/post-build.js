'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');
var chalk      = require('chalk');
var ui         = require('../ui');
var Promise    = require('../ext/promise');

function createCommand(project, options) {
  var platform    = options.platform || 'ios';
  var command     = 'cordova build ' + platform;

  if (options.emulate) {
    command += ' && cordova emulate ' + platform;
  } else if (options.run) {
    command += ' && cordova run --device ';
  }

  return runCommand(command, null, {
    cwd: path.join(project.root, 'cordova')
  });
}

module.exports = function(project, options, firstBuild) {
  if (!options.rebuildOnChange && !firstBuild) {
    return function() {};
  }

  var host = options.liveReload.hostIP;
  var port = options.liveReload.hostPort;

  if (!options.rebuildOnChange) {
    var message = 'Updating config.xml to enable live reload';
    var cordovaPath = path.join(project.root, 'cordova');
    var contentSrcRegex = /(src=\")[\w\.\d\:\/]+(\")/;

    require('./modify-xml')(message, cordovaPath, function(xml) {
      var url = "http://" + host + ":" + port + "/index.html";
      xml = this.xmlReplace(contentSrcRegex, url, xml);

      return xml;
    })();
  }

  return function() {
    ui.start(chalk.green('Building cordova project and launching emulator'));
    var rebuild = createCommand(project, options)();

    rebuild.then(function() {
      ui.stop();
      ui.write(chalk.green('Cordova build successful.\n'));
    });

    return Promise.resolve();
  }
};
