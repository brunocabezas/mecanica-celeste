// https://developer.mozilla.org/en-US/docs/Web/API/History_API

export const push = url => window.history.pushState({}, '', url);

export const getBaseUrl = () => window.location.origin;

export const get = () => window.location.href;

export const hasParams = () => get().includes('?');

export const setVideo = (videoName) => {
  const videoToUrl = videoName.toLowerCase().replace(/ /g, '_');
  push(`${window.location.href}?video=${videoToUrl}`);
};

export const clear = () => push(getBaseUrl());
