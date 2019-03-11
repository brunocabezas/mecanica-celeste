import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <span />;
const LoadableModal = Loadable({
  loader: () => import('./Modal'),
  loading: Loading,
});

export default LoadableModal;
