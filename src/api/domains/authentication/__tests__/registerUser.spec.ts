import { registerUser } from '../registerUser';
import { userResourceMock } from './userResourceMock';

let userResource: any = null;
describe('#registerUser', () => {
  describe('when user does not exist', () => {
    beforeEach(() => {
      userResource = userResourceMock()
    })
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
    it('fails to register due to existing email', (done) => {
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
