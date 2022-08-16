import faker from '@faker-js/faker'
let userData: any

Feature('PUT tests').tag('@REST')

Before(async ({ I }) => {
  userData = {
    name: faker.name.firstName(),
    job: 'leader',
  }
  await I.createNewUser(userData)
})

Scenario('Verify creating new user', async ({ I }) => {
  userData['name'] = faker.name.firstName()
  const { data } = await I.sendPutRequest('/api/users/2', userData)
  await I.assertEqual(data.name, userData['name'])
})
