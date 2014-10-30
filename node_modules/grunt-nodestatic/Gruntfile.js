/*
 * grunt-nodestatic
 * https://github.com/ia3andy/grunt-nodestatic
 *
 * Copyright (c) 2013 Andy Damevin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    },

    nodestatic: {
      custom_base: {
        options: {
          base: 'test'
        },
      },
      custom_port: {
        options: {
          port: 9000,
        },
      },
      dev_move: {
        options: {
          port: 9001,
          dev: true
        },
      },
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  grunt.registerTask('test', ['nodestatic', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);
};
