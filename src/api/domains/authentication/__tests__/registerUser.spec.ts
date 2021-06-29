import { registerUser } from '../registerUser';
import { userResourceMock } from '../../__mocks__/userResource.mock';

let userResource: any = null;
describe('#registerUser', () => {
  beforeEach(() => {
    userResource = userResourceMock()
  })
  describe('when user does not exist', () => {
    it('registers user', async () => {
      const data = {
        username: 'adam',
        email: 'adam@example.com',
        password: 'qwerty'
      }
      const user: any = await registerUser({ userResource, data })
      expect(user.username).toEqual(data.username);
      expect(user.email).toEqual(data.email);
      expect(user.confirmed).toBeFalsy()
      expect(user.password).not.toEqual('qwerty')
    });
  })

  describe('when user exists', () => {
    it('throws an error', (done) => {
      const data = {
        username: 'something',
        email: 'exists@example.com',
        password: 'qwerty'
      }
      registerUser({ userResource, data }).then(res => {
        console.log('then', res);
        done();
      }).catch(err => {
        expect(err.message).toEqual('user_exists');
        done()
      })
    });
  });
})
