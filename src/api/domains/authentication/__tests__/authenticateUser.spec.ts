import { authenticateUser } from '../authenticateUser';
import { userResourceMock } from '../__mocks__/userResourceMock';

jest.mock('bcryptjs');

describe('#authenticateUser', () => {
  let userResource: any = null;
  const compare = async (text: string, _hash: string): Promise<boolean> => {
    return await new Promise(resolve => {
      if (text === 'hashyhash') {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }
  beforeEach(() => {
    userResource = userResourceMock();
  })
  describe('credentials are valid', () => {
    it('returns a user', async () => {
      const user = await authenticateUser({
        userResource,
        data: {
          email: 'login@example.com',
          password: 'hashyhash'
        },
        compare
      })
      expect(user.email).toEqual('login@example.com')
      expect(user.confirmed).toBeTruthy()
    })
  })

  describe('when credentials are invalid', () => {
    it('throws an error', (done) => {
      authenticateUser({
        userResource,
        data: {
          email: 'login@example.com',
          password: 'wrongpass'
        },
        compare
      }).catch(error => {
        expect(error.message).toEqual('invalid_credentials')
        done();
      })
    })
  })

  describe('when email does not exist', () => {
    it('throws an error', done => {
      authenticateUser({
        userResource,
        data: {
          email: 'idontexist@example.com',
          password: 'hashyhash'
        },
        compare
      }).catch(error => {
        expect(error.message).toEqual('invalid_credentials')
        done();
      })
    })
  })

  describe('when email is not confirmed', () => {
    it('throws an error', done => {
      authenticateUser({
        userResource,
        data: {
          email: 'notconfirmed@example.com',
          password: 'hashyhash'
        },
        compare
      }).catch(error => {
        expect(error.message).toEqual('email_not_confirmed')
        done();
      })
    })
  })
});
