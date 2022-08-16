import {
  cartPage,
  checkoutPage,
  inventoryPage,
  loginPage,
  addressDetails,
  productDetails,
  credentials,
  getUrlByEnvironment,
} from '../index'

Feature('Checkout').tag('@Smoke')

Before(({ I }) => {
  I.amOnPage(getUrlByEnvironment('swaglabs'))
})

Scenario('Standard user can complete the checkout', async () => {
  loginPage.userLogin(credentials.standard.username, credentials.standard.password)
  inventoryPage.addProductToCart(productDetails.product01.id)
  inventoryPage.navigateToCartPage()
  cartPage.continueToCheckout()
  checkoutPage.fillAddressDetails(
    addressDetails.address01.firstName,
    addressDetails.address01.lastName,
    addressDetails.address01.postalCode,
  )
  checkoutPage.continueToOverview()
  checkoutPage.verifyOverviewInfo(productDetails.product01.name, productDetails.product01.price)
  checkoutPage.finishOrder()
  checkoutPage.verifyCompletedCheckOut()
})
