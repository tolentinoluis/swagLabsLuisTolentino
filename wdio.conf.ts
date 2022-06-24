import * as dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const url = (process.env.APP_URL) ? process.env.APP_URL : 'https://www.saucedemo.com';

export const config = {
  runner: 'local',
  specs: [
    './tests/ui/**/*.test.ts',
  ],
  suites: {
    smoke: []
  },
  exclude: [],
  maxInstances: 5,
  capabilities: [{
    maxInstances: 5,
    browserName: 'chrome',
    acceptInsecureCerts: true,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'goog:chromeOptions': {
      args: [
        '--headless',
        '--disable-gpu',
        '--disable-logging',
        '--disable-back-forward-cache',
        '--disable-cookie-encryption',
        '--disable-gpu-program-cache',
        '--window-size=1280,1024'
      ]
    }
  }],
  logLevel: 'error',
  bail: 0,
  baseUrl: url,
  waitforTimeout: 30000,
  connectionRetryTimeout: 30000,
  connectionRetryCount: 3,
  services: [
    ['chromedriver', {
      logFileName: 'wdio-chromedriver.log', // default
      outputDir: './all-logs/driver-logs', // overwrites the config.outputDir
      args: ['--silent']
    }],
  ],
  framework: 'mocha',
  outputDir: 'all-logs',
  reporters: [
    'spec',
    ['junit', {
      outputDir: './all-logs/junit',
      outputFileFormat: function (options) {
        return `results-${options.capabilities.browserName}-${options.cid}.xml`;
      }
    }]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
    require: [
      'tsconfig-paths/register'
    ]
  },
  before: function (capabilities, specs, browser) {
    // resetting the browser window size to make sure the viewport is the same
    // so that the images we are comparing matches wether we are running the tests
    // in either headless mode or not.
    const viewportDiff = browser.execute(
      'return ({width: window.outerWidth - window.innerWidth, height: window.outerHeight - window.innerHeight});'
    );
    const newWidth = 1280 + viewportDiff.width;
    const newHeight = 1024 + viewportDiff.height;
    browser.setWindowRect(null, null, newWidth, newHeight);
  }
};
