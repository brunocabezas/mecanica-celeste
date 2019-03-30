export const push = url => window.history.pushState(null, null, url);

export const getBaseUrl = () => window.location.href.split('?')[0];

export const hasParams = () => window.location.href.includes('?');
