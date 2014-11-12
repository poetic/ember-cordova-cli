describe('Tasks - Create cordova project', function() {
  var project;
  beforeEach(function() {
    project = newProject();
  });

  it('creates the proper command', function() {
    var createProject = proxyquire('../../lib/tasks/create-cordova-project', {
      '../utils/run-command': function(command) {
        expect(command).to.eql('cordova create development com.poetic.test-app TestApp');
        return resolveFn;
      }
    });

    return createProject(project, 'development')();
  });

  it('should execute in proper folder', function() {
    var createProject = proxyquire('../../lib/tasks/create-cordova-project', {
      '../utils/run-command': function(_, _, options) {
        expect(options.cwd).to.equal('project-root/cordova');
        return resolveFn;
      }
    });

    return createProject(project, 'development')();
  });
});
