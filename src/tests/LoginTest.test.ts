import { loginErrorMessage, loginPage, credentials, getUrlByEnvironment } from '../index'

Feature('Login test').tag('@Smoke')

Before(({ I }) => {
  I.amOnPage(getUrlByEnvironment('swaglabs'))
})

Scenario('Standard user can successfully login with valid credentials', async () => {
  loginPage.userLogin(credentials.standard.username, credentials.standard.password)
  loginPage.verifySuccessFulLogin()
})

Scenario('Locked-out user cannot login with valid credentials', async () => {
  loginPage.userLogin(credentials.locked.username, credentials.locked.password)
  loginPage.verifyErrorMessage(loginErrorMessage.lockedOutUser)
})

Scenario('Error message is displayed when logging in with invalid credentials', async () => {
  loginPage.userLogin(credentials.invalidUser.username, credentials.invalidUser.password)
  loginPage.verifyErrorMessage(loginErrorMessage.invalidUserCredentials)
})
