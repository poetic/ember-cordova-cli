# Getting Started

This guide will walk you through setting up your first app with
ember-cli-cordova.

## Prerequisites

- [ember-cli](http://www.ember-cli.com)
- [cordova](https://www.npmjs.org/package/cordova)

## Setting Up The App

First, let's set up your ember-cli project:

```sh
ember new hello
```

After that's set up, we need to add the ember-cli-cordova addon to the application. Go in the freshly generated `hello` folder, then install the addon.

```sh
ember install ember-cli-cordova
```

Ember cli-cordova requires cordova. If you don't have cordova, use this line to install it.

```
npm install -g cordova
```

To intialize the cordova project we use a generator provided by
ember-cli-cordova. You pass in the com domain identifier that you want to use
with your app. It can be anything you like as long as it's unique. This matters
if you plan on releasing it to the app stores. It takes an optional `platform`
argument that defaults to `ios`. If you want to generate an android project you
would pass in `--platform=android` at the end.

```sh
ember generate cordova-init com.poeticsystems.hello
```

This will prompt you to overwrite some default files. You should overwrite them
as they provide some required settings and helpful additions.

This will also create the cordova project for you in the `cordova` directory. If
you ever need raw access to the cordova project you can `cd` into this directory
to run the command or modify files.

After that, the project is ready to go. There are some configuration options in
your environment config that you can set to enable / disable some features. See
the [configuration](https://github.com/poetic/ember-cli-cordova/blob/master/docs/configuration.md) section for information on that.

### Optional Starter Kit

There's also a starter kit generator. This includes lots of goodies that we use
at our company to develop our cordova apps. things like
[broccoli-sass](https://github.com/joliss/broccoli-sass) for sass support and
[liquid-fire](https://github.com/ef4/liquid-fire) for animations. It also
includes a default application adapter, modal component, style resets and extra
configuration.

To run this, simple run

```sh
ember generate cordova-starter-kit
```

## Developing The App

Once your project is set up, you're ready to start developing. We've tried to
keep the experience as similar to ember-cli as possible. You just need to move
your `locationType` setting in `config/environment.js` to `defaultLocationType`
so that it'd be used when not building for cordova (cordova needs `hash` as
`locationType`).

Then you can simply run the `serve` command and begin

```sh
ember serve
```

This will run the ember server and behave no different than in vanilla
ember-cli. This is the primary place you will be working as it provides the
quickest feedback loop, debugging tools and best experience.

The one drawback to this is that any cordova plugins you use will not work in
the browser. This means that when you want to test the functionality of
a plugin, you will need to load the app up on a simulator or device.

When you need to serve or build files for a browser environment (not for cordova)
be sure to override the `EMBER_CLI_CORDOVA` environment variable to set it to a
falsy value (`0`, `no`, `off` or `false`). It'll allow you to use `locationType`
as specified in `defaultLocationType` and will not inject the `cordova.js`
script tag.

```sh
EMBER_CLI_CORDOVA=0 ember serve
```

### Running The App On A Simulator Or Device

When you need to run on a device or simulator, we have some options to automate
this. By default, all features that affect the cordova build are disabled. You
will need to enable the ones you want in the `config/environment.js`.

#### Normal Cordova Build

To run a simple cordova build with ember linked up, run

```
ember cordova:build
```

This will build your ember project, link everything up to cordova and run
a cordova build. If you choose this route, no changes will be reflected in the
running app until you run it again. To simplify, after every change you will
need to run this command. Sometimes that's what you want, but we have an option
to automate this.

In your `config/environment` you can set `cordova.rebuildOnChange` to true. This
will hook into the ember server and automate this build after every change. Then
when you run the app again, you will be able to see the changes.

While this is convenient at times(mainly plugin development) it's still not as
quick as we want it to be. We want Livereload on the device!

#### Livereload

When enabled, this feature will allow you to use ember-cli's livereload when the
app is running on you device or simulator. This allows you get instant feedback
on a real device which allows you to get the full experience of using the app
and plugins with an instant feedback loop. It is disabled in production...[for
now](https://github.com/poetic/ember-cli-cordova/pull/56).

Livereload is currently disabled by default and will need to be turned on in
your `config/environment`. To enable it, set `cordova.liveReload.enabled` to
true, and set `cordova.liveReload.platform` to the platform you will be running
the app on. Disable `cordova.rebuildOnChange` to enable fast live reload using
the built-in live reloading mechanisms of Ember CLI.

Now that you have configured livereload, you just need to run the ember server normally,
using the traditional command, with only one difference: you need to specify the host to your
LAN IP address (something like 192.168.0.3), so the emulator or a device picks up the correct page
and livereload works.

```
ember s --host=<your_lan_ip_address>
```

Again, like already said, this isn't rebuilding cordova every time
you make a change, and there are some things you should be aware that needs the server
to be restarted in order to cordova to rebuild.

- When making changes to the environment config.
- When you add/remove/update plugins or native code.
