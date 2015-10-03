// Karma configuration
// Generated on Sun Jun 07 2015 15:14:20 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'src/',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'lib/angular/angular.js',
      'lib/angular-ui-router/release/angular-ui-router.min.js',
      'lib/angular-material/angular-material.min.js',
      'lib/angular-animate/angular-animate.min.js',
      'lib/angular-aria/angular-aria.min.js',
      'lib/lodash/lodash.js',
      'lib/angular-mocks/angular-mocks.js',
      'lib/chance/chance.js',
      'app/init.js',
      'app/constants/init.js',
      'app/services/init.js',
      'app/utils/init.js',
      'app/models/init.js',
      'app/interceptors/init.js',
      'app/views/init.js',
      'app/views/root/init.js',
      'app/views/home/init.js',
      'app/views/home-detail/init.js',
      'app/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      'lib/**/*.spec.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '!(lib)/**/!(*.spec).js': ['coverage'],
      '!(lib)/**/*.html': ['ng-html2js'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
        file: '',
        dir: '../coverage'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
