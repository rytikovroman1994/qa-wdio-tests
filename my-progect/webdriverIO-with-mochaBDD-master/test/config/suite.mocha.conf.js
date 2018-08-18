//to use debug option run `DEBUG=true followed by your .conf.js`
const defaultTimeoutInterval  = process.env.DEBUG ? (60 * 60 * 500) : 90000;

exports.config = {

    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `WebdriverIO` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
       './test/specs/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // './test/specs/file-to-exclude.js'
    ],

    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 15,

    capabilities: [
          // maxInstances can get overwritten per capability. So if you have an in-house Selenium
          // grid with only 5 firefox instance available you can make sure that not more than
          // 5 instance gets started at a time.

        //{browserName: 'chrome', platform: '', version: '', maxInstances: '5'},
        //{browserName: 'firefox', platform: '', version: '', maxInstances: '5'},

          {
              browserName: 'chrome',
              platform: '',
              version: '',
              // acceptUntrustedCertificates: true,
              // webdriver_accept_untrusted_certs: true,
              // webdriver_assume_untrusted_issuer: true,
              // cssSelectorsEnabled: true,
              maxInstances: '1',
              // specs: [
              //     './test/specs/*.js'
              // ],
          },

          // {
          //     browserName: 'firefox',
          //     platform: '',
          //     version: '',
          //     maxInstances: '5',
          //     //build: process.env.TRAVIS_BUILD_NUMBER,
          //     // specs: [
          //     //     './test/specs/sampe*.js'
          //     // ],
          // },

          // {
          //     browserName: 'internet explorer',
          //     platform: '',
          //     version: '',
          //     acceptUntrustedCertificates: true,
          //     ignoreProtectedModeSettings: true,    //only applicable to IE browser
          //     ignoreZoomSetting: true,              //only applicable to IE browser
          //     ensureCleanSession: true,
          //     maxInstances: '5',
          //     // specs: [
          //     //     './test/specs/*.js'
          //     // ],
          // },


          // {
          //     browserName: 'safari',
          //     //platform: 'OS X 10.12.4',
          //     //version: '9',
          //     //acceptInsecureCerts: true,
          //     //acceptUntrustedCertificates: true,
          //     maxInstances: '5',
          //     // specs: [
          //     //     './test/specs/*.js'
          //     // ],
          // },

          // {
          //     browserName: 'phantomjs',
          //     platform: '',
          //     version: '',
          //     maxInstances: '5',
          //
          //     //  specs: [
          //     //    './test/specs/*.js'
          //     //  ],
          // },

          // {
          //     browserName: 'chrome',
          //     chromeOptions: {
          //       // run in headless mode
          //       args: ['--headless'],
          //       //binary:   '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
          //       binary:   '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'  //for OS X
          //       //binary:   '/Program Files (x86)/Google/Chrome/Application/chrome.exe'     //for windows7
          //     },
          //     platform: '',
          //     version: '',
          //     maxInstances: '5',
          //     // specs: [
          //     //     './test/specs/*.js'
          //     // ],
          // }
    ],


    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true,
    reporters: ['spec'],
    logLevel: 'command',               // Level of logging verbosity: silent | verbose | command | data | result | error
    coloredLogs: true,                // Enables colors for log output.
    screenshotPath: './test/reports/errorShots/', // Saves a screenshot to a given path if a command fails.
    //
    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", then the base url gets prepended.
    baseUrl: 'https://vw.kodix.ru/',
    waitforTimeout: 10000,            // Default timeout for all waitFor* commands.
    connectionRetryTimeout: 10000,    // Default timeout in milliseconds for request if Selenium Grid doesn't send response
    connectionRetryCount: 1,          // Default request retries count
    
    services: ['selenium-standalone'],
    // services: ['selenium-standalone', 'phantomjs'],

    framework: 'mocha',
    mochaOpts: {
      ui: 'bdd',
      timeout: 90000,
      compilers: ['js:babel-register'],
    },

    reporters: ['spec', 'junit','allure', 'json', 'mochawesome'],
    reporterOptions: {
        junit:  {outputDir:   './test/reports/junit-results/'},
        json:   {outputDir:   './test/reports/json-results/'},
        allure: {
          outputDir:   './test/reports/allure-results/',
          disableWebdriverStepsReporting: false,
          //useCucumberStepReporter: false,
        },
        mochawesome:  {outputDir:   './test/reports/mocha-results/'},
        mochawesomeOpts: {
          includeScreenshots: true,
          screenshotUseRelativePath:true
        },
    },
    //
    // =====
    // Hooks
    // =====
    // WedriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //
    // Gets executed before test execution begins. At this point you can access all global
    // variables, such as `browser`. It is the perfect place to define custom commands.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
      console.log('**** let\'s go ****');
    },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    beforeSession: function (config, capabilities, specs) {
        //require('babel-register')
    },
    /**
    // Gets executed before test execution begins. At this point you can access all global
    // variables, such as `browser`. It is the perfect place to define custom commands.
    * @param {Array.<Object>} capabilities list of capabilities details
    * @param {Array.<String>} specs List of spec file paths that are to be run
    */
    before: function (capabilities, specs) {
      /**
       * Setup the Chai assertion framework
       */
      const chai    = require('chai');
      global.expect = chai.expect;
      global.assert = chai.assert;
      global.should = chai.should();
    },
    //
    // Hook that gets executed before the suite starts
    // beforeSuite: function (suite) {
    // },
    //
    // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
    // beforeHook: function (each) {
    // },
    //
    // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
    // afterEach in Mocha)
    // afterHook: function (currentTest) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
    // beforeTest: function (test) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    afterTest: function (test) {
      //console.log(test);
     },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. It is not
     * possible to defer the end of the process using a promise.
     * @param {Object} exitCode 0 - success, 1 - fail
     */
    onComplete: function(exitCode) {
      console.log('**** that\'s it ****');
    }
}
