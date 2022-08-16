Feature('GET tests').tag('@REST')

Scenario('Verify a successful call', async ({ I }) => {
  await I.sendGetRequest('/api/users?page=2')
  I.seeResponseCodeIsSuccessful()
})

Scenario('Verify a not found call', async ({ I }) => {
  await I.sendGetRequest('/api/users/266')
  I.seeResponseCodeIsClientError()
})

Scenario('Verify getting a single user', async ({ I }) => {
  const { data } = await I.sendGetRequest('/api/users/2')

  I.seeResponseContainsKeys(data)
  I.seeResponseValidByCallback(({ data, expect }) => {
    expect(data.id)
  })
})

Scenario('Verify getting list of users', async ({ I }) => {
  const { data } = await I.sendGetRequest('/api/users?page=2')

  I.seeResponseContainsKeys(data)
  I.seeResponseContainsJson({
    page: 2,
    total: 12,
    per_page: 6,
  })
})
