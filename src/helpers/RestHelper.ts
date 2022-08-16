import { actor } from 'codeceptjs'
import faker from '@faker-js/faker'
import ex from 'codeceptjs-expectwrapper'

export = () => {
  return actor({
    async createNewUser(userData: object) {
      const payload = userData || {
        name: faker.name.firstName(),
        job: 'leader',
      }

      return this.sendPostRequest('/api/users', payload)
    },
    ...ex,
  })
}
