# ember-cli-cordova [![Build Status](https://travis-ci.org/poetic/ember-cli-cordova.svg?branch=master)](https://travis-ci.org/poetic/ember-cli-cordova)

*requires at least ember-cli >= 0.1.1*

I will not be focusing on backward compatibility with older ember-cli versions
as it's moving too fast and the API is constantly changing. I will always have
this working with the latest stable release of ember-cli.

## Goals

Provide a toolchain tightly integrated with ember-cli to make developing hybrid
apps with cordova and ember as simple as possible.

# Installation

Inside of a generated ember-cli project run:

```sh
npm install --save-dev ember-cli-cordova
```

Then you need to initialize the cordova part. Mobile app's require a com
identifier/reverse style domain so we need to specify it here:

```sh
ember generate cordova-init com.reverse.domain
```

This will generate a base cordova iOS app and store it within the `cordova/`
directory. If you would like to add other platforms, you can run the
`ember cordova` command:

```sh
ember cordova platform add android
```

You must have [cordova](https://www.npmjs.org/package/cordova) installed
globally for this command to work.

# Usage

## Blueprints
+ `ember g cordova-init com.reverse.domain platform:android` Required generator
  that sets up the cordova project with a few tweaks to the ember app
+ `ember g cordova-starter-kit` Adds some packages and files that makes up the
  base setup for projects I develop.

## Commands
+ `ember cordova:open --platform android --application eclipse` opens native project
  if no application defined it will use the default
+ `ember cordova:build --environment production --platform ios` build cordova project
+ `ember cordova:archive 0.0.2 --environment staging --commit --tag` archive ios project with xcode
+ `ember cordova:prepare` needs to be run after cloning a project
+ `ember cordova` Passes commands(plugin(s), platform(s), run, emulate) and arguments to the cordova command
+ `ember help` ember cli help with a section for addon provided commands as well

### General
In the root folder you can run standard ember-cli commands and develop in the
browser. All cordova commands you need are wrapped by ember-cli-cordova, see the
above section on commands for help.

#### Recommended Workflow

Develop as much as you can in the browser because it provides the quickest
feedback. Every now and then build the cordova version and make sure it's
working properly. You can use the Livereload option to get instant feedback on
the device or in the simulator.

If you are working with a native plugin and need the app in the simulator,
enable the rebuild option in the configuration as described below.

### Running in the simulator

After making a change to the ember app or native plugins, you must run `ember
cordova:build` to update the build to contain those changes. You can then
relaunch the app by building inside of xcode/eclipse or running `ember cordova
emulate <platform>`. If you are using the Livereload option, you only need to
build after environment changes or native changes.

### App Livereload

Livereload is enabled by default on your device or simulator build. This is
because cordova.js overwrites some browser listeners and when it's enabled the
app will not start automatically in the browser. If you need it to start, just
call `AppName.advanceReadiness()` in the browser once it's loaded. (We will try
and get a fix for this soon)

When you need to build and run it on the device, you can enable it in the
config. See the section below for the options.

#### How to use it

1. Enable it in the config
2. run `ember cordova:build`
3. run `ember serve`
4. In a new terminal, run 'ember cordova emulate ios'
5. Now with the server running, your device should live reload when you make
   changes

#### Notes

- You will need to rebuild the cordova build when you make changes to the
  environment. Specifically when you change the liveReload settings. Though this
  is always good practice.
- When you add/remove/update plugins or native code you will also need to run
  the cordova build.
- You will need to set the `emberUrl` in the config if you are running the app
  on a device that is not on the same computer or on a different port. It
  defaults to `http://localhost:4200`
- This is a fairly new feature and we are really excited about it. If you have
  any trouble with it please submit an issue or PR so that we can resolve it.

### Configuration

All configuration is currently optional. Configuration will be done in your
app's config/environment.js file. You need to set it up like this:

```js
ENV.cordova = {
  // Rebuild the cordova project on file changes. Blocks the server until it's
  // finished.
  //
  // default: false
  rebuildOnChange: true,

  // Run the cordova emulate command after the build is finished
  //
  // default: false
  emulate: true,

  // Which platform to build and/or emulate
  //
  // default: 'ios'
  platform: 'ios',

  // Which URL the ember server is running on. This is used when using
  // live-reload that comes with the starter kit.
  //
  // default: 'the-device-ip:4200'
  emberUrl: 'http://10.0.1.12:4200',

  // Whether or not to use liveReload on the device simulator. Requires a few
  // plugins to be installed that come with the starter-kit. It will cause your
  // app to not boot up in the browser
  //
  // default: false and iOS
  liveReload: {
    enabled: false,
    platform: 'ios'
  }
};
```

The rebuild option is most useful when developing or working with a cordova
plugin when you need the javascript updated along with the native component and
don't have liveReload enabled.

### Builds

To build for different environments you run the `ember cordova:build` command with
the options you want

# Docs

Documentation can be found found in the docs directory [here](https://github.com/poetic/ember-cli-cordova/tree/master/docs).

# Dependency Docs

+  [ember-cli](http://ember-cli.com)
+  [cordova](http://cordova.apache.org/docs/en/3.6.0/)
+  [liquid-fire](https://github.com/ef4/liquid-fire)

# FAQ

#### I am getting `Current working directory is not a Cordova-based project.` when I run a cordova command

If you are running a cli command, make sure the dist directory exists. You can
run `ember build` to create it if it doesnt. You can also try to run `ember
cordova:prepare`

#### When running `ember cordova:archive` command I get an Xcode build error saying the scheme doesnt exist

Error example:

```
ld[10658:1007] WARNING: Timed out waiting for <IDEWorkspace,
0x7fc00d207d40>/"runContextManager.runContexts" (10.000125 seconds elapsed)
xcodebuild: error: The project 'MyApp' does not contain a scheme named 'MyApp'.
```

This is caused by not having opened the project in Xcode before. It
automatically generates some info it needs to archive the project. To fix this,
run `ember cordova:open` and let it open in Xcode. After you've done this once you
can just run `ember cordova:archive` command again and it shouldn't give you any more
trouble.

# Contributing

## Working with master

``` sh
git clone https://github.com/poetic/ember-cli-cordova.git
cd ember-cli-cordova
npm i && bower i
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
