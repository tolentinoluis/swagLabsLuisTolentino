import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: './.env' });
const url = (process.env.APP_URL) ? process.env.APP_URL : 'https://www.saucedemo.com';

export const config = {
  runner: 'local',
  specs: [
    './tests/**/*.e2e.ts',
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
      // logFileName: 'wdio-chromedriver.log', // default
      outputDir: './all-logs/driver-logs', // overwrites the config.outputDir
      args: ['--silent']
    }],
    ['image-comparison', {
      // see the full list of options here
      // https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#method-options
      baselineFolder: join(process.cwd(), './e2e/visual-regression/reference/'),
      formatImageName: '{tag}_{browserName}_{logName}',
      screenshotPath: join(process.cwd(), './e2e/visual-regression/'),
      savePerInstance: true,
      autoSaveBaseline: true,
      scaleImageToSize: true,
      ignoreAntialiasing: true,
      clearRuntimeFolder: true,
      tabbableOptions: {
        circle: {
          size: 18,
          fontSize: 18,
        },
        line: {
          color: 'red',
          width: 3,
        },
      }
    }],
    ['devtools'],
  ],
  framework: 'jasmine',
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
  jasmineOpts: {
    defaultTimeoutInterval: 60000,
    requires: ['tsconfig-paths/register']
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
