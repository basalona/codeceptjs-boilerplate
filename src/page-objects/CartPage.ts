const { I } = inject()

export const cartPage = {
  button: {
    checkout: "//button[@id='checkout']",
  },

  continueToCheckout() {
    I.click(this.button.checkout)
  },
}
