export const push = url => window.history.pushState(null, null, url);

export const getBaseUrl = () => window.location.origin;

export const get = () => window.location.href;

export const hasParams = () => window.location.href.includes('?');

export const setVideo = (videoName) => {
  const videoToUrl = videoName.toLowerCase().replace(/ /g, '_');
  push(`${window.location.href}?video=${videoToUrl}`);
};

export const clear = () => push(getBaseUrl());
