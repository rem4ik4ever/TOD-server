export const serveStaticFiles = (): boolean => {
  if (typeof process.env.STATIC_FILES_PATH === 'undefined') {
    return false;
  }
  return true;
};

export const getStaticPath = (): string => {
  if (typeof process.env.STATIC_FILES_PATH !== 'undefined') {
    return process.env.STATIC_FILES_PATH;
  }
  return '/public';
};

export const getVirtualRoot = (): string => {
  if (typeof process.env.VIRTUAL_ROOT_PATH !== 'undefined') {
    return process.env.VIRTUAL_ROOT_PATH;
  }
  return '/';
};
