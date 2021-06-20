export const userResourceMock = jest.fn(() => {
  return {
    findByEmail: async (email: string) => {
      return await new Promise((resolve) => {
        if (email === 'exists@example.com') {
          resolve({
            result: {
              id: 'uuid',
              username: 'I Exist',
              email: 'exists@example.com',
              password: 'existingpass'
            }
          })
        }
        resolve({
          error: new Error('user_exists')
        })
      })
    },
    createUser: async (data: any) => {
      return await new Promise((resolve) => {
        resolve({
          result: {
            id: 'uuid-1',
            username: data.username,
            email: data.email,
            confirmed: false,
            password: 'hashyhash'
          }
        })
      })
    }
  }
})
