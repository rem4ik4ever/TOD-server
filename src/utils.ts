export const isDefined = (item: null|undefined|any): Boolean => {
  if (item === undefined || item == null) return false;
  return true;
}

export const cookieOptions = (): any => {
  if (process.env.NODE_ENV === 'production') {
    return {
      // the next line allows to use the session in non-https environements
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none'
    }
  }
  return {}
}
