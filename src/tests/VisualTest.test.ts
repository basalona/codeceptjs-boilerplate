import { inventoryPage, credentials, loginPage, getUrlByEnvironment } from '../index'

Feature('Visual Testing').tag('@Visual')

Before(({ I }) => {
  I.amOnPage(getUrlByEnvironment('swaglabs'))
})

Scenario('Compare login page with screenshot', ({ I }) => {
  const filename = 'loginPage.png'

  I.saveScreenshot(filename, true)
  I.seeVisualDiff(filename, { tolerance: 2 })
})
Scenario('Compare home page with visual elements', ({ I }) => {
  const filename = 'homePage.png'

  loginPage.userLogin(credentials.standard.username, credentials.standard.password)
  I.saveScreenshot(filename, true)
  I.seeVisualDiffForElement(inventoryPage.button.cart, filename, { tolerance: 2, scaleToSameSize: true })
})
