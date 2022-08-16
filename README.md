# CodeceptJS Boilerplate Project

This repository is a minimal, optimized boilerplate CodeceptJS project based on the Swag Labs playground site that
includes
tests for basic functionalities. This can be used as an initial prototype and built upon to set up automated tests for a
project or just as a reference point when learning CodeceptJS.

The sample project tests are written using the meta framework [CodeceptJs](https://codecept.io/). CodeceptJS is a
successor
of Codeception, a popular full-stack testing framework for PHP. With CodeceptJS your scenario-driven functional and
acceptance
tests will be as simple and clean as they can be. You don't need to worry about asynchronous nature of NodeJS or about
various
APIs of Selenium, Puppeteer, Protractor, TestCafe, etc. as CodeceptJS unifies them and makes them work as they are
synchronous.
This framework represents a wrapper for other JS-based testing or browser automation frameworks.
In our case, the underlying testing framework is [Playwright](https://playwright.dev/).

## Prerequisites

- Node.js 14 or 16 and above (https://nodejs.org/en/download/)\
  Since the packages and dependencies are downloaded and used with NPM (Node Package Manager) or Yarn, it is necessary
  to install Node.js prior to using any CodeceptJS.
- _In this boilerplate example, we will be using Yarn as the default package manager; you can change this according to your preference._

## Installation

1. Clone the repository with `git clone https://stash.ecx.io/scm/qa/codeceptjs-boilerplate-project.git`
2. Navigate to the root of the repository
3. Install CodeceptJS and other project dependencies with the terminal command `yarn install`
4. You can execute the sample tests with the terminal command `yarn test`

## Tests

Tests are located in the `/tests` folder and structured as follows:

- The file name consists of the tested feature and the `.test.ts` suffix. E.g., `LoginTest.test.ts`
- The test file consists of
  - the feature declaration which should match the file name (it can contain whitespace). E.g., `Feature('Login')`
  - the scenario declaration(s) which should have a brief but descriptive name about the tested scenario.
    E.g., `Scenario('User can login')`
- Tests can be filtered by appending `@tag` to your test name. E.g., `Feature('Login test').tag('@Smoke')`

#### More information about tags can be found [here](https://codecept.io/advanced/#tags).

### Visual tests

CodeceptJS is capable of doing visual tests using the helper `codeceptjs-resemblehelper` which can be used to compare
screenshots and make the tests fail/pass based on the tolerance allowed.

`Codeceptjs-resemblehelper` basically comes with two major functions:

- seeVisualDiff which can be used to compare two images and calculate the misMatch percentage.
- seeVisualDiffForElement which can be used to compare elements on the two images and calculate misMatch percentage.

#### More information about this helper can be found [here](https://github.com/puneet0191/codeceptjs-resemblehelper)

_Currently, visual tests are not supported for parallel tests run._

### API tests

CodeceptJS provides a way to write tests in declarative manner for REST and GraphQL APIs. Basic example of REST tests are added to the repository to get you started with.

#### More information about REST API can be found [here](https://codecept.io/api/)

### Performance tests

[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) performance measurements from Google Chrome can be automated by using CodeceptJS. Basic example of Performance tests is added to the repository to get you started with.

#### More information about performance measurements can be found [here](https://github.com/abhinaba-ghosh/playwright-lighthouse)

_Performance tests currently support `Chrome`, `Chromium`, or `Canary` browsers. It is also advisable not to run the performance tests in parallel to avoid incorrect performance measures and slow-running tests.._

### Page Objects

Page objects are located in the `/page-objects` folder and structured as follows:

- Page object file names consist of the page's name and the `Page.ts` suffix. E.g., `LoginPage.ts`
- Page fragment object file names consist of page fragment's name and the `PageFragment.ts` suffix.
  E.g., `ChatPageFragment.ts`

#### New to Page objects and want to learn more?

- Check out these links for more information:
  - [PageObject](https://codecept.io/pageobjects/).
  - [PageFragments](https://codecept.io/pageobjects/#page-fragments).

### Step Objects

Step objects are located in the `/step-objects` folder and structured as follows:

- Step object file names consist of the page's name and the `Step.ts` suffix. E.g., `ChangeUserPermissionStep.ts`

#### Learn more about Step objects in the below link:

- [Step Objects](https://codecept.io/pageobjects/#stepobjects).

### Custom helpers

Helper is the core concept of CodeceptJS. Helper is a wrapper on top of various libraries providing unified interface
around them. When `I` object is used in tests it delegates execution of its functions to currently enabled helper
classes. Use Helpers to introduce low-level API to your tests without polluting test scenarios. Helpers can also be used
to share functionality across different project and installed as npm packages.

Custom helpers are located in the `/helpers` folder and structured as follows:

- Step object file names consist of the helper's name and the `Helper.ts` suffix. E.g., `RecordingHelper.ts`

#### Learn more about Step objects in the below link:

- [Custom helpers](https://codecept.io/helpers/).

### Report

In order to get the Allure report locally, you can run your test with the `allure` plugin using the `--plugins allure`
flag.
After executing the tests you can run `yarn start:allure` to start the allure server that will
render the report in the browser.
This runs [`allure-commandline`](https://www.npmjs.com/package/allure-commandline) which requires Java 8 or higher.
`DBHelper.ts` is a helper class that can be used to interact with the database and upload the test results to mysql db and visualise in Grafana.

### Naming Conventions

All file names follow
the "[Pascal Case](https://betterprogramming.pub/string-case-styles-camel-pascal-snake-and-kebab-case-981407998841)"
naming convention.

### Using a browser different from the bundled one

Playwright comes with a bundled browser version.
By default, the tests are therefore run against the latest stable version of Chromium.
However, Playwright can also use a locally installed beta browser version, which can be helpful, for example, to test
against other browser versions (like Chrome beta or canary).
To override the browser to be launched, you can add the `channel: 'your installed beta browser'`, property to the
playwright's browser launch options in the `codecept.conf.js`.

You can also override the browser to be launched by adding the `executablePath` property to the playwright's browser
launch options in the `codecept.conf.js`.
The `executablePath` should point to the browser application you wish to launch.
For Chromium based browsers like Chrome or Edge, you should still specify the browser type as `chromium` and override
the `executablePath`.

```JSON
//codecept.conf.js
helpers: {
Playwright: {
browser: 'chromium',
chromium: {
executablePath: '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
},
},
...
```
