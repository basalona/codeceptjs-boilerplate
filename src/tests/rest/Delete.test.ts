Feature('DELETE tests').tag('@REST')
let createdUser: any

Before(async ({ I }) => {
  createdUser = await I.createNewUser()
})

Scenario('Verify deleting a user', async ({ I }) => {
  const id = createdUser['data']['id']

  const { data } = await I.sendDeleteRequest(`/api/users/${id}`)
  I.seeResponseCodeIsSuccessful()
  await I.assertEqual(data, '')
})
