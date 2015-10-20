module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // jshint
    jshint: {
      options: {
        globals: {
          angular: true,
        },
        ignores: ['app/lib/*']
      },
      uses_defaults: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js']
    },

    // uglify - for .min/prod builds --$$$$ needs updating
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'app/**/*.js',
        dest: 'dist/js/dmsi.namerizer.js'
      },
    },

    // concat - for concatenating but not minifying (dev mode)
    concat: {
      lib: {
        src: ['app/lib/**/*.js'],
        dest: 'dist/js/lib.js'
      },
      dmsi: {
        src: ['app/**/*.js', '!app/lib/**/*.*', '!app/**/*.test.js'],
        dest: 'dist/js/dmsi.namerizer.js',
      },
      options: {

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
        },

    },

    // copy
    copy: {
      main: {
        files: [
          // HTML files go to dist relative to their current place
          {expand: true, cwd: 'app/', src: ['**/*.html', 'media/**/*.*'], dest: 'dist/'},
        ]
      }
    },

    sass: {
        options: {
            sourceMap: true,
            stule: 'expanded'
        },
        dist: {
            files: {
                '/repos/namerizer/dist/css/main.css': '/repos/namerizer/app/scss/main.scss'
            }
        }
    },

    // karma - unit test runner
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        singleRun: true
      },
      continuous: {
        background: true
      }
    },

    // watch
    watch: {
      jsdev: {
        files: ['app/**/*.js', '!app/lib/**/*.*', 'app/**/*.test.js'],
        tasks: ['jsdev']
      },
      htmldev: {
        files: ['app/**/*.html', 'app/**/*.css', '!app/lib/**/*.*'],
        tasks: ['htmldev']
      },
      karma: {
        files: ['app/**/*.js', 'app/**/*.html', 'app/**/*.scss', 'app/**/*.css', '!app/lib/**/*.*'],
        tasks: ['jshint', 'karma:continuous:run', 'sass', 'concatAndCopy']
      },
      karmaNoSass: {
        files: ['app/**/*.js', 'app/**/*.html', '!app/lib/**/*.*'],
        tasks: ['jshint', 'karma:continuous:run', 'concatAndCopy']
      }
    },


});

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-sass');

  // Default task(s).
  grunt.registerTask('default', ['dev']);
  grunt.registerTask('justSass', ['sass']);
  grunt.registerTask('concatAndCopy', ['concat:lib', 'concat:dmsi', 'copy']);
  grunt.registerTask('dev', ['karma:continuous:start', 'watch:karma']);
  grunt.registerTask('devNoSass', ['karma:continuous:start', 'watch:karmaNoSass']);





};
