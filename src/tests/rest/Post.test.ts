import FormData from 'form-data'
import { createReadStream } from 'fs'
const form = new FormData()

Feature('POST tests').tag('@REST')

Scenario('Verify creating new user', async ({ I }) => {
  await I.createNewUser()
  await I.seeResponseCodeIsSuccessful()
})

Scenario('Verify uploading a file', async ({ I }) => {
  form.append('attachment', createReadStream('./src/test-support/rest-testing/test_image.png'))

  await I.sendPostRequest('https://httpbin.org/post', form)
  await I.seeResponseCodeIsSuccessful()
})
