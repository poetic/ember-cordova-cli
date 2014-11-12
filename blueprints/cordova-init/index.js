var projectWithConfig = require('../../lib/models/project-with-config');
var Promise           = require('../../lib/ext/promise');
var stringUtils       = require('../../lib/utils/string');
var defaultENV        = 'development';

module.exports = {
  locals: function(options) {
    var name = options.project.pkg.name;

    return {
      namespace:     stringUtils.classify(name),
      modulePrefix:  stringUtils.dasherize(name)
    }
  },

  afterInstall: function(options) {
    this.options = options.entity.options;
    this.options.platform = options.platform || 'ios';

    projectWithConfig(this.project, options.entity.name);

    return this.setupCordova();
  },

  setupCordova: function() {
    var createDir       = require('../../lib/tasks/add-cordova-directory')(this.project);
    var createProject   = require('../../lib/tasks/create-cordova-project')(this.project, defaultENV);
    var addPlatforms    = require('../../lib/tasks/add-platforms')(this.project, this.options, defaultENV);
    var updateConfig    = require('../../lib/tasks/update-config-xml')(this.project, defaultENV);
    var linkEnvironment = require('../../lib/tasks/link-environment')(this.project, defaultENV);

    return createDir().then(createProject).then(addPlatforms).then(updateConfig).then(linkEnvironment);
  }
};
