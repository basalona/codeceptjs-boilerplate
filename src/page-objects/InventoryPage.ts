const { I } = inject()

export const inventoryPage = {
  button: {
    products: (productId: string) => `//button[@id='add-to-cart-${productId}']`,
    cart: "//a[@class='shopping_cart_link']",
  },

  addProductToCart(productId: string) {
    I.waitForVisible(this.button.products(productId))
    I.click(this.button.products(productId))
  },

  navigateToCartPage() {
    I.click(this.button.cart)
  },
}
