import { isDefined } from 'src/utils';

describe('utils', () => {
  describe('isDefined', () => {
    it('works as expected', () => {
      expect(isDefined(null)).toBeFalsy();
      expect(isDefined(undefined)).toBeFalsy();
      expect(isDefined('a')).toBeTruthy();
      expect(isDefined(2)).toBeTruthy();
      expect(isDefined(false)).toBeTruthy();
      expect(isDefined(true)).toBeTruthy();
      expect(isDefined({})).toBeTruthy();
      expect(isDefined([])).toBeTruthy();
    })
  });
});
