import { v4 as uuidv4 } from 'uuid';
/* eslint-disable @typescript-eslint/no-unused-vars */
export const userResourceMock = jest.fn(() => {
  const users: any = [
    {
      id: 'uuid',
      username: 'I Exist',
      email: 'exists@example.com',
      password: 'existingpass',
      confirmed: false
    },
    {
      id: 'uuid-login',
      username: 'LoginUser',
      email: 'login@example.com',
      password: 'hashyhash',
      confirmed: true
    },
    {
      id: 'uuid-not-confirmed',
      username: 'NotConfirmedUser',
      email: 'notconfirmed@example.com',
      password: 'hashyhash',
      confirmed: false
    }
  ];
  return {
    findByEmail: async (email: string) => {
      return await new Promise((resolve) => {
        const found = users.filter((u: any) => email === u.email).pop();
        if (typeof found !== 'undefined') {
          resolve(found);
        } else {
          resolve(
            null
          )
        }
      })
    },
    createUser: async (data: any) => {
      return await new Promise((resolve) => {
        const found = users.filter((u: any) => data.email === u.email).pop();
        if (typeof found !== 'undefined') return { error: new Error('user_exists') }
        const newUser = {
          id: uuidv4(),
          username: data.username,
          email: data.email,
          confirmed: false,
          password: 'hashyhash'
        }
        users.push(newUser);
        resolve(newUser)
      })
    }
  }
})
