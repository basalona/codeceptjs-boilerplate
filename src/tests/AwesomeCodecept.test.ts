import { credentials, getUrlByEnvironment, loginPage } from '../index'
import { expect } from '@playwright/test'

const tryTo = codeceptjs.container.plugins('tryTo')

Feature('Unique features').tag('@Smoke')

Scenario('Open new tab and navigate to new domain and switch back to previous tab', ({ I }) => {
  I.amOnPage(getUrlByEnvironment('electronics'))
  I.openNewTab()
  I.amOnPage(getUrlByEnvironment('swaglabs'))
  loginPage.userLogin(credentials.standard.username, credentials.standard.password)
  I.switchToPreviousTab()
  I.see('DSC-N1')
  I.closeOtherTabs()
})

Scenario('Open new page and navigate to new domain and switch back to previous page', ({ I }) => {
  I.amOnPage(getUrlByEnvironment('electronics'))

  session('open new page', () => {
    I.amOnPage(getUrlByEnvironment('swaglabs'))
    loginPage.userLogin(credentials.standard.username, credentials.standard.password)
  })
  I.see('DSC-N1', '.owl-wrapper')
})

Scenario('Use Playwright to new page', ({ I }) => {
  I.usePlaywrightTo('open page', async ({ page }) => {
    await page.goto(getUrlByEnvironment('electronics'))
    await expect(page).toHaveURL(/.*site=electronics/)
  })
})

Scenario('Use tryTo for conditional assertions', async ({ I }) => {
  I.amOnPage(getUrlByEnvironment('electronics'))
  const result = await tryTo(() => I.waitForText('I am awesome'))
  I.say(result)
})

Scenario('Use retry to minimize the flakiness of tests', ({ I }) => {
  const closeButton = "//button[normalize-space()='×']"

  I.amOnPage(getUrlByEnvironment('electronics'))
  I.retry({
    retries: 2,
    minTimeout: 3000,
  }).click(closeButton)
})

Scenario('Attaching a File', ({ I }) => {
  const selectFile = "//input[@id='file-upload']"
  const filePath = 'src/test-support/rest-testing/test_image.png'
  const uploadButton = "//input[@id='file-submit']"

  I.amOnPage(`https://the-internet.herokuapp.com/upload`)
  I.attachFile(selectFile, filePath)
  I.click(uploadButton)
  I.waitForText('File Uploaded!')
})

Scenario('Dealing with Iframes', ({ I }) => {
  const frame = "//a[@title='Brands']/../../div"
  const brands = "//a[@title='Brands']"
  const product = "//a[@title='Canon']"

  I.amOnPage(getUrlByEnvironment('electronics'))
  I.moveCursorTo(brands)
  I.switchTo(frame)
  I.waitForVisible(product)
  I.click(product)
  I.waitInUrl('Brands/Canon/')

  // Alternative method
  /*within(frame, () => {
    I.waitForVisible(product)
    I.click(product)
    I.waitInUrl('Brands/Canon/')
  })*/
})
