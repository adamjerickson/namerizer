module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      //'app/lib/jquery.min.js',

      'app/lib/_angular.min.js',
      'app/lib/angular-mocks.js',
      'app/lib/angular-ui-router.min.js',
      'app/lib/angular-animate.min.js',
      'app/lib/angular-aria.min.js',

      'app/app.js',
      'app/app.test.js',
      'app/controllers/**/*.js'
      // 'app/services/**/*.js',
      // 'app/view*/**/*.js',
      // 'app/directives/**/*.js',
      // 'app/directives/**/*.html'
    ],

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-phantomjs-launcher',
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    preprocessors: {
      'app/directives/**/*.html':['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/',
      //stripSuffix: '.ext',
      // prepend this to the
      //prependPrefix: 'served/',

      // or define a custom transform function
      //cacheIdFromPath: function(filepath) {
      //  return cacheId;
      //},

      // - setting this option will create only a single module that contains templates
      //   from all the files, so you can load them all with module('foo')
      // - you may provide a function(htmlPath, originalPath) instead of a string
      //   if you'd like to generate modules dynamically
      //   htmlPath is a originalPath stripped and/or prepended
      //   with all provided suffixes and prefixes
      moduleName: 'dmsiNamerizer-test-directives'
    }

  });
};
