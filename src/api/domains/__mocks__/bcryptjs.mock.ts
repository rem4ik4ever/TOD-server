/* eslint-disable @typescript-eslint/explicit-function-return-type */
const bcryptjs: any = jest.createMockFromModule('bcryptjs')

const compare = async (text: string, _hash: string) => {
  return await new Promise(resolve => {
    if (text === 'hashyhash') {
      resolve(true)
    } else {
      resolve(false)
    }
  })
}
bcryptjs.compare = compare;
module.exports = bcryptjs;
