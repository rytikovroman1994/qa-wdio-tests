// ======================
// Внимание! Тут куча гавнокода, который правит лишь Глеб Азаров
// Уберите свой любопытный нос в целях самосохранения
// ======================
require('dotenv').config();
const path = require('path');
const os = require('os');
const chai = require('chai');
const chaiWebdriver = require('chai-webdriverio').default;
const requireGlob = require('require-glob');
const getRandom = require('./get-random');

const config = {
  isDevelopment: process.env.NODE_ENV !== 'production',
  // URL тестируемого стенда
  baseUrl: process.env.URL || (() => { throw new Error('Не задан целевой хост для тестирования, см. README.md'); })(),
};

config.maxInstances = process.env.CONCURRENCY || config.isDevelopment ? 1 : os.cpus().length;

config.services = config.isDevelopment ? ['selenium-standalone'] : [];

const logLevels = ['silent', 'verbose', 'command', 'data', 'result', 'error'];
if (process.env.LOG_LEVEL && logLevels.includes(process.env.LOG_LEVEL)) {
  config.logLevel = process.env.LOG_LEVEL;
} else {
  config.logLevel = logLevels[config.isDevelopment ? 1 : 0];
}

// Для простоты понимания назовём это списком браузеров, на которых надо запускать тесты
const browsersListDevelopment = [{ browserName: 'chrome' }];
const browsersListProduction = [
  {
    browserName: 'chrome',
  },
  // Выключил, потому что в firefox не работают селекторы по id и усё ломается
  // {
  //   browserName: 'firefox',
  //   marionette: true,
  // },
  // Пока что выключим, потом надо будет через аргументы пробросить список браузеров
  // {
  //   browserName: 'safari',
  // },
];
config.capabilities = config.isDevelopment ? browsersListDevelopment : browsersListProduction;

if (process.env.SELENIUM_HUB_HOST) {
  config.host = process.env.SELENIUM_HUB_HOST;
}

if (process.env.SELENIUM_HUB_PORT) {
  config.port = process.env.SELENIUM_HUB_PORT;
}

module.exports.config = {
  ...config,
  // Файлы с тестами
  specs: [
    './specs/**/*.js',
  ],
  // Тут можно описать glob'ы для исключения файлов из списка тестов
  exclude: [],

  // аргументы запуска selenium
  seleniumArgs: {
    javaArgs: [
      `-Dwebdriver.edge.driver=${path.join(__dirname, './drivers/MicrosoftWebDriver.exe')}`,
    ],
  },

  // использовать ли wdio-sync для запуска тестов или нет
  sync: true,
  // Включить раскрашивания stdout
  coloredLogs: true,
  // Сейчас очень много функций кричат о deprecation статусе, так что замьютим
  deprecationWarnings: false,
  // Если мы хотим, что бы тесты завершались после первого проваленного кейса, то надо эту опцию увеличить (0 - выключить)
  bail: 0,
  // Папка для скриншотов проваленных кейсов
  screenshotPath: './reports/fail-screenshots',
  // Таймаут по умолчанию для всех waitFor* команд.
  waitforTimeout: 12000, // ms
  // Таймаут запроса к Selenium server
  connectionRetryTimeout: 90000,
  // Количество попыток переотправки запроса к Selenium server
  connectionRetryCount: 3,

  framework: 'mocha',
  reporters: ['spec', 'json', 'mochawesome'],
  reporterOptions: {
    outputDir: './reports',
    mochawesome_filename: 'mochawesome.json',
  },
  // Опции запуска mocha
  mochaOpts: {
    /**
     * @todo попробовать воткнуть сюда grep и fgrep
     */
    ui: 'bdd',
    compilers: ['js:babel-register'],
    timeout: config.isDevelopment ? 10e6 : 100000,
  },

  // Когда-нибудь мы заюзаем это для чего-нибудь нужного, а пока пусть так лежат
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // onPrepare: function (config, capabilities) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  // beforeSession: function (config, capabilities, specs) {
  // },
  // eslint-disable-next-line
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   *
   * @param {Array.<Object>} capabilities - List of capabilities details.
   * @param {Array.<String>} specs - List of spec file paths that are to be run.
   */
  before() {
    chai.config.includeStack = true;
    global.expect = chai.expect;
    chai.use(chaiWebdriver(browser, { defaultWait: 5000 }));
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  // eslint-disable-next-line
  /**
   * Hook that gets executed before the suite starts.
   *
   * @param {Object} suite - Suite details.
   */
  beforeSuite() {
    // эта дичь позволяет в repl'е перезагружать все хелперы без перезапуска wdio
    browser.reloadHelpers = function reloadHelpers(bustCache = true) {
      const helpersOriginal = requireGlob.sync(['helpers/**/*.js', '!helpers/utils/*'], { bustCache });
      browser.helpers = {};

      (function fn(helpers) {
        Object.entries(helpers)
          .forEach(([, helper]) => {
            if (typeof helper === 'object') {
              if (helper.__esModule !== true) { // eslint-disable-line no-underscore-dangle
                fn(helper);
              } else if (typeof helper.default === 'function') {
                if (!helper.default.name) {
                  throw new Error('Helper function must have name');
                }

                browser.helpers[helper.default.name] = helper.default;
              }
            }
          });
      }(helpersOriginal));
    };

    // подключаем хелперы
    if (!browser.helpers) {
      browser.reloadHelpers(false);
    }

    browser.getRandom = getRandom;
  },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   *
   * @param {Object} test - Test details.
   */
  // beforeTest(test) {
  // },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  // beforeHook: function () {
  // },
  /**
   * Hook that gets executed _after_ a hook within the suite ends (e.g. runs after calling
   * afterEach in Mocha)
   */
  // afterHook: function () {
  // },
  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
   * @param {Object} test test details
   */
  afterTest({ err }) {
    if (err && process.env.DEBUG_ON_FAIL && browser) {
      browser.debug();
    }
  },
  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  // afterSuite: function (suite) {
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
   *
   * @param {Object} config - Wdio configuration object.
   * @param {Array.<Object>} capabilities - List of capabilities details.
   * @param {Array.<String>} specs - List of spec file paths that ran.
   */
  // afterSession(config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // onComplete: function(exitCode, config, capabilities) {
  // }
};
