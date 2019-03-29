import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <span />;
const LoadableAboutModal = Loadable({
  loader: () => import('./AboutModal'),
  loading: Loading,
});

export default LoadableAboutModal;
