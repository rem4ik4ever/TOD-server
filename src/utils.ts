export const isDefined = (item: null|undefined|any): Boolean => {
  if (item === undefined || item == null) return false;
  return true;
}
