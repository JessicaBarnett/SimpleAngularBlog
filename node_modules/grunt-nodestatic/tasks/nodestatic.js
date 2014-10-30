/*
 * grunt-static
 * https://github.com/ia3andy/grunt-static
 *
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var nodestatic = require('node-static'),
      tty = require('tty'),
      colors = require('colors');

  grunt.registerMultiTask('nodestatic', 'Start a static web server.', function() {
    // Merge task-specific options with these defaults.
    var options = this.options({
      port: 8080,
      base: '.',
      keepalive: false,
      cache: 7200,
      dev: false,
      headers: {},
      serverInfo: "grunt-static",
      verbose: true
    });

    // Start server.
    var done = this.async();
    var taskTarget = this.target;
    var keepAlive = this.flags.keepalive || options.keepalive;

    var serverOptions = {
      headers: options.headers,
      cache: options.cache,
      serverInfo: options.serverInfo
    };

    if(options.dev){
      if(serverOptions.headers == null){
        serverOptions.headers = {}
      }
      serverOptions.headers["Cache-Control"] = "no-cache, must-revalidate"
    }

    var log = function(request, response, statusCode) {
        var d = new Date();
        var seconds = d.getSeconds() < 10? '0'+d.getSeconds() : d.getSeconds(),
            datestr = d.getHours() + ':' + d.getMinutes() + ':' + seconds,
            line = datestr + ' [' + response.statusCode + ']: ' + request.url + "\n",
            colorized = line;
        if (tty.isatty(process.stdout.fd))
            colorized = (response.statusCode >= 500) ? line.red.bold :
                        (response.statusCode >= 400) ? line.red :
                        line;
        grunt.log.write(colorized);
    };


    var fileServer = new nodestatic.Server(options.base, serverOptions)
    require('http').createServer(function (request, response) {
        //addListener commented out for windows
		//request.addListener('end', function () {
            fileServer.serve(request, response, function(e, rsp) {
                if (e && e.status === 404) {
                    response.writeHead(e.status, e.headers);
                    response.end("404 Not found");
                    log(request, response);
                } else if (e && e.code === 'EADDRINUSE') {
                    grunt.fatal('Port ' + options.port + ' is already in use by another process.');
                } else if (options.verbose) {
                    log(request, response);
                }
            });
        //});
    }).listen(options.port)
    .on('listening', function() {
      grunt.log.writeln('Serving ' + options.base + ' on port ' + options.port + '.');
      grunt.config.set('nodestatic.' + taskTarget + '.options.port', options.port);

      if (!keepAlive) {
        done();
      }
    });


    if (keepAlive) {
      // This is now an async task. Since we don't call the "done"
      // function, this task will never, ever, ever terminate. Have fun!
      grunt.log.write('Waiting forever...\n');
    }
  });
};
