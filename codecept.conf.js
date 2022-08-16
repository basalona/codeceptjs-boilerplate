require('ts-node/register')
const { setHeadlessWhen } = require('@codeceptjs/configure')
const fs = require('fs-extra')
const { execSync } = require('child_process')

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS)

const outputFolderPath = './output'
const diffFolderPath = './src/test-support/visual-testing/screenshots/diff/'
const isParallel = process.env.IS_PARALLEL === 'true'

exports.config = {
  tests: './src/tests/**/*.test.ts',
  output: outputFolderPath,
  helpers: {
    Playwright: {
      browser: process.env.BROWSER ? process.env.BROWSER : 'chromium',
      show: true,
      timeout: 5000,
      waitForTimeout: 5000,
      waitForNavigation: 'load',
      video: 'true',
      keepVideoForPassedTests: 'true',
      fullPageScreenshots: true,
      emulate: {
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
      },
    },
    ReportHelper: {
      require: './src/helpers/ReportHelper.ts',
    },
    ...(isParallel || {
      ResembleHelper: {
        require: 'codeceptjs-resemblehelper',
        screenshotFolder: outputFolderPath,
        baseFolder: './src/test-support/visual-testing/screenshots/base/',
        diffFolder: diffFolderPath,
        prepareBaseImage: false,
      },
    }),
    REST: {
      endpoint: 'https://reqres.in',
    },
    JSONResponse: { requestHelper: 'REST' },
  },
  async bootstrap() {
    try {
      fs.removeSync(outputFolderPath)
      fs.removeSync(diffFolderPath)
      fs.ensureDirSync(outputFolderPath)
      fs.ensureDirSync(diffFolderPath)
    } catch (e) {
      console.log('Could not complete deleting the output folders. Test automation will continue. Reason: ', e)
    }
    console.log('Cleaning test output folder is done.')
  },
  async teardownAll() {
    execSync(' allure generate --clean ./output ')
  },
  name: 'codeceptjs-boilerplate-project',
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
      uniqueScreenshotNames: true,
    },
    allure: {
      enabled: true,
      outputDir: outputFolderPath,
    },
    tryTo: {
      enabled: true,
    },
    BrowserLogsOnFail: {
      enabled: true,
      uniqueNames: true,
      require: 'codeceptjs-browserlogs-plugin',
    },
  },
  multiple: {
    parallel: {
      chunks: 1,
      browsers: ['webkit', 'firefox', 'chromium'],
    },
  },
  include: {
    I: './src/helpers/RestHelper.ts',
  },
}
