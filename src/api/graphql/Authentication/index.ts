import { objectType } from 'nexus'

export * from './mutations'

export const AuthType = objectType({
  name: 'AuthType',
  definition (t) {
    t.field('user', {
      type: 'User'
    })
    t.field('token', {
      type: 'String'
    })
  }
})
