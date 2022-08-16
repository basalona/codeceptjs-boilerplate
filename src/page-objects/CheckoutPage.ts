const { I } = inject()

export const checkoutPage = {
  fields: {
    firstName: "//input[@id='first-name']",
    lastName: "//input[@id='last-name']",
    zipCode: "//input[@id='postal-code']",
  },
  button: {
    continue: "//input[@id='continue']",
    finish: "//button[@id='finish']",
  },

  fillAddressDetails(firstName: string, lastName: string, zipCode: string) {
    I.waitForVisible(this.fields.firstName)
    I.fillField(this.fields.firstName, firstName)
    I.fillField(this.fields.lastName, lastName)
    I.fillField(this.fields.zipCode, zipCode)
  },

  continueToOverview() {
    I.click(this.button.continue)
  },

  verifyOverviewInfo(productName: string, productPrice: string) {
    I.waitForText(productName)
    I.waitForText(productPrice)
  },

  finishOrder() {
    I.click(this.button.finish)
  },

  verifyCompletedCheckOut() {
    I.waitForText('THANK YOU FOR YOUR ORDER')
  },
}
