const { I } = inject()

export enum loginErrorMessage {
  lockedOutUser = 'Sorry, this user has been locked out.',
  invalidUserCredentials = 'Username and password do not match any user in this service',
}

export const loginPage = {
  fields: {
    username: "//input[@id='user-name']",
    password: "//input[@id='password']",
  },
  buttons: {
    login: "//input[@id='login-button']",
  },

  userLogin(username: string, password: string) {
    I.waitForVisible(this.fields.username)
    I.fillField(this.fields.username, username)
    I.fillField(this.fields.password, password)
    I.click(this.buttons.login)
  },
  verifySuccessFulLogin() {
    I.waitForVisible('#inventory_container')
  },

  verifyErrorMessage(message: string) {
    I.waitForText(message)
  },
}
