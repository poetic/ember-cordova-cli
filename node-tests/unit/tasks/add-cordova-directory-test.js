describe('Tasks - Add Cordova Directory', function() {
  it('creates the proper command', function() {
    var addDirectory = proxyquire('../../lib/tasks/add-cordova-directory', {
      '../utils/run-command': function(command) {
        expect(command).to.equal('mkdir cordova');
      }
    });

    return addDirectory({root: 'test'});
  });

  it('executes command in project root directory', function() {
    var addDirectory = proxyquire('../../lib/tasks/add-cordova-directory', {
      '../utils/run-command': function(_, __, options) {
        expect(options.cwd).to.equal('test');
      }
    });

    return addDirectory({root: 'test'});
  });
});
