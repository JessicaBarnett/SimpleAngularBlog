# grunt-nodestatic

> Start a node-static web server (perfect as a development server combined with watch of regarde).



## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-nodestatic --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-nodestatic');
```




## static task
_Run this task with the `grunt nodestatic` command._

Note that this server only runs as long as grunt is running. Once grunt's tasks have completed, the web server stops. This behavior can be changed with the [keepalive](#keepalive) option, and can be enabled ad-hoc by running the task like `grunt nodestatic:keepalive`.

This task was designed to be used in conjunction with another task that is run immediately afterwards, like the [grunt-contrib-watch plugin](https://github.com/gruntjs/grunt-contrib-watch) `watch` task.

This plugin is perfect for development purpose combined with grunt watch.

### Options

#### port
Type: `Integer`
Default: `8080`

The port on which the webserver will respond. The task will fail if the specified port is already in use. You can use the special values `0` or `'?'` to use a system-assigned port.

#### base
Type: `String`
Default: `'.'`

The base (or root) directory from which files will be served. Defaults to the project Gruntfile's directory.

#### keepalive
Type: `Boolean`
Default: `false`

Keep the server alive indefinitely. Note that if this option is enabled, any tasks specified after this task will _never run_. By default, once grunt's tasks have completed, the web server stops. This option changes that behavior.

This option can also be enabled ad-hoc by running the task like `grunt nodestatic:targetname:keepalive`

#### dev
Type: `Boolean`
Default: `true`

If true, specify additional headers (this one is useful for development):
'{"Cache-Control": "no-cache, must-revalidate"}'

#### verbose
Type: `Boolean`
Default: `false`

If true, show each file requested on the server with differents colors following the status code

#### headers
Type: `Object`
Default: `{}`

Sets response headers.

example: `{ 'X-Hello': 'World!' }`

### Usage examples

#### Basic Use
In this example, `grunt nodestatic` (or more verbosely, `grunt nodestatic:server`) will start a static web server at `http://localhost:9001/`, with its base path set to the `www-root` directory relative to the gruntfile, and any tasks run afterwards will be able to access it.

```javascript
// Project configuration.
grunt.initConfig({
  nodestatic: {
    server: {
      options: {
        port: 8080,
        base: 'www-root'
      }
    }
  }
});
```

If you want your web server to use the default options, just omit the `options` object. You still need to specify a target (`uses_defaults` in this example), but the target's configuration object can otherwise be empty or nonexistent. In this example, `grunt nodestatic` (or more verbosely, `grunt nodestatic:uses_defaults`) will start a static web server using the default options.

```javascript
// Project configuration.
grunt.initConfig({
  nodestatic: {
    uses_defaults: {}
  }
});
```

#### Multiple Servers
You can specify multiple servers to be run alone or simultaneously by creating a target for each server. In this example, running either `grunt nodestatic:site1` or `grunt nodestatic:site2` will  start the appropriate web server, but running `grunt nodestatic` will run _both_. Note that any server for which the [keepalive](#keepalive) option is specified will prevent _any_ task or target from running after it.

```javascript
// Project configuration.
grunt.initConfig({
  nodestatic: {
    site1: {
      options: {
        port: 9000,
        base: 'www-roots/site1'
      }
    },
    site2: {
      options: {
        port: 9001,
        base: 'www-roots/site2'
      }
    }
  }
});
```




## Release History

 * 2013-04-11   v0.1.0   First working version
 * 2013-04-14   v0.1.1   Fix dev mode and verbose option
 * 2013-04-14   v0.1.2   add Windows compatibility


---

This project is a fork form the official grunt-contrib-connect.

This project use node-static as static web server.

---

Task submitted by ["ia3andy" Andy Damevin](https://github.com/ia3andy)



