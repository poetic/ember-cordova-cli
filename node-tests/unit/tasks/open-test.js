describe('Tasks - Open', function() {
  var project;
  beforeEach(function() {
    project = newProject();
  });

  it('rejects when the platform isn\'t supported', function() {
    var open = proxyquire('../../lib/tasks/open', {});

    return open(project, 'development', 'fake-platform').catch(function(err) {
      expect(err.toString()).to.match(/platform is not supported/);
    });
  });

  describe('runs correct command on each platform', function() {
    var platform;
    before(function() {
      platform = process.platform;
    });

    after(function() {
      process.platform = platform;
    });

    describe('darwin', function() {
      beforeEach(function() {
        process.platform = 'darwin';
      });

      it('ios', function() {
        return assertOpenCommand(project, 'development', 'ios', 'open "project-root/cordova/development/platforms/ios/*.xcodeproj"');
      });

      it('android', function() {
        return assertOpenCommand(project, 'development', 'android', 'open "project-root/cordova/development/platforms/android/.project"');
      });
    });

    describe('win32', function() {
      beforeEach(function() {
        process.platform = 'win32';
      });

      it('ios', function() {
        return assertOpenCommand(project, 'development', 'ios', 'start "project-root/cordova/development/platforms/ios/*.xcodeproj"');
      });

      it('android', function() {
        return assertOpenCommand(project, 'development', 'android', 'start "project-root/cordova/development/platforms/android/.project"');
      });
    });

    describe('other', function() {
      beforeEach(function() {
        process.platform = 'other';
      });

      it('ios', function() {
        return assertOpenCommand(project, 'development', 'ios', 'xdg-open "project-root/cordova/development/platforms/ios/*.xcodeproj"');
      });

      it('android', function() {
        return assertOpenCommand(project, 'development', 'android', 'xdg-open "project-root/cordova/development/platforms/android/.project"');
      });
    });
  });
});

function assertOpenCommand(project, environment, platform, assertion) {
  var open = proxyquire('../../lib/tasks/open', {
    '../utils/run-command': function(command) {
      expect(command).to.eql(assertion);
    }
  });
  return open(project, environment, platform);
}
