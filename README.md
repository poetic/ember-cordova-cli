# ember-cli-cordova [![Build Status](https://travis-ci.org/poetic/ember-cli-cordova.svg?branch=master)](https://travis-ci.org/poetic/ember-cli-cordova)

*requires ember-cli > 0.0.37*

## Goals

Provide a toolchain tightly integrated with ember-cli to make developing hybrid
apps with cordova and ember as simple as possible.

# Installation

Inside of a generated ember-cli project run:

```
npm install --save-dev ember-cli-cordova
```

You must have [cordova](https://www.npmjs.org/package/cordova) installed
globally for this command to work.

# Usage

## Commands
+ `ember cordova:init com.poetic.myapp --platform ios` initialize cordova project
+ `ember cordova platform add android` Adds another platform to an already initialized cordova project
+ `ember cordova:open` open cordova xcode project
+ `ember cordova:build --environment production --platform ios` build cordova project
+ `ember cordova:archive 0.0.2 --environment staging --commit --tag` archive ios project with xcode
+ `ember cordova:prepare` needs to be run after cloning a project
+ `ember cordova` Passes commands(plugin(s), platform(s), run, emulate) and arguments to the cordova command
+ `ember help` ember cli help with a section for addon provided commands as well

### General
In the root folder you can run standard ember-cli commands and develop in the
browser. Most cordova commands you need are wrapped in some way by ember-cli-cordova,
if you need to run raw commands you will need to cd into the `cordova/`
directory

**Recommended Workflow**
Develop as much as you can in the browser because it provides the quickest
feedback. Every now and then build the cordova version and make sure it's
working properly.

If you are working with a native plugin and need the app in the simulator,
enable the rebuild in the configuration described below.

### Running in the simulator
If you do not have rebuildOnChange enabled(described in the configuration
section), after making a change to the ember app, you must run `ember
cordova:build` to update the build to contain those changes. You can then
relaunch the app by building inside of xcode/eclipse or running `cordova emulate
<platform>`

### Configuration

All configuration is currently optional. Configuration will be done in your
app's config/environment.js file. You need to set it up like this: 

*All options are related to the rebuild process.*

```js
ENV.cordova = {
  // Rebuild the cordova project on file changes. Blocks the server until it's
  // finished.
  //
  // default: false
  rebuildOnChange: true, 

  // Don't block the server during the rebuild
  //
  // default: false
  rebuildAsync: true, 

  // Run the cordova emulate command after the build is finished
  //
  // default: false
  emulate: true 

  // Which platform to build and/or emulate
  //
  // default: 'ios'
  platform: 'ios' 
};
```

I recommend only enabling this when you need it. It takes awhile to rebuild and
will slow everything down. The rebuild option is most useful when developing or
working with a cordova plugin when you need the javascript updated along with
the native component.

### Builds

To build for different environments you run the `ember cordova:build` command with
the options you want

# Docs / Guides

This project is mostly a combination of other projects, I plan on writing some
guides on the basic of how to use it and what it contains, until then here is
some info about some dependencies it uses.

+  [ember-cli](http://iamstef.net/ember-cli/)
+  [cordova](http://cordova.apache.org/docs/en/3.4.0/)
+  [ember-animated-outlet](https://github.com/billysbilling/ember-animated-outlet)
+  [moment.js](http://momentjs.com/docs/)

# FAQ

#### I am getting `Current working directory is not a Cordova-based project.` when I run a cordova command

If you are running a cli command, make sure the dist directory exists. You can
run `ember build` to create it if it doesnt.

#### When running `ember cordova:archive` command I get an Xcode build error saying the scheme doesnt exist

Error example:

```
ld[10658:1007] WARNING: Timed out waiting for <IDEWorkspace,
0x7fc00d207d40>/"runContextManager.runContexts" (10.000125 seconds elapsed)
xcodebuild: error: The project 'MyApp' does not contain a scheme named 'MyApp'.
```

This is caused by now having opened the project in Xcode before. It
automatically generates some info it needs to archive the project. To fix this,
run `ember cordova:open` and let it open in Xcode. After you have done this once you
can just run the `archive` command again and it shouldn't give you any more
trouble.

# Potential gotchas

+  locationType must be set to hash to work inside cordova

# Contributing

## Working with master

``` sh
git clone https://github.com/poetic/ember-cli-cordova.git
cd ember-cli-cordova
npm link
ember new CordovaTest
cd CordovaTest
npm install --save-dev ember-cli-cordova
npm link ember-cli-cordova
```

After this, any changes you make to the cloned repo will be instantly reflected
in the test app you generated. It just symlinks the node_modules folder.

# Example App

You can find an example app using this here:
[jakecraige/ember-cli-cordova-example-app](https://github.com/jakecraige/ember-cli-cordova-example-app)

# Credits

[ember-cli](https://github.com/stefanpenner/ember-cli)
[ember](https://github.com/emberjs/emberjs)
