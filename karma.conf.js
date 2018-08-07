// Karma configuration
// Generated on Sat Jan 27 2018 12:13:14 GMT+0100 (Hora estándar romance)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jasmine',
      'karma-typescript'
    ],

    karmaTypescriptConfig: {
          compilerOptions: {
              module: "commonjs",
              moduleResolution: "node",
          },
          tsconfig: "./tsconfig.json",
          /*bundlerOptions: {
              transforms: [
                  require("karma-typescript-es6-transform")()
              ]
          }*/
      },


    // list of files / patterns to load in the browser
    files: [
      //'src/**/*spec.ts',
      'src/app/**/*.ts'
    ],

    // list of files / patterns to exclude
    exclude: [
        'src/app/app.ts',
        "src/**/*.d.ts"
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "**/*.ts": 'karma-typescript'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'karma-typescript'],


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
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
