describe('Tasks - Add Platforms', function() {
  it('creates the proper command', function() {
    var addPlatforms = proxyquire('../../lib/tasks/add-platforms', {
      '../utils/run-command': function(command) {
        expect(command).to.equal('cordova platform add some-platform');
      }
    });

    return addPlatforms({root: 'test'}, {platform: 'some-platform'}, 'development');
  });

  it('executes the command in the cordova/[environment] directory', function() {
    var addPlatforms = proxyquire('../../lib/tasks/add-platforms', {
      '../utils/run-command': function(_, __, options) {
        expect(options.cwd).to.equal('test/cordova/development');
      }
    });

    return addPlatforms({root: 'test'}, {platform: 'some-platform'}, 'development');
  });
});
