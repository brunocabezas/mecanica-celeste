import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <span />;
const LoadableNodeModal = Loadable({
  loader: () => import('./NodeModal'),
  loading: Loading,
});

export default LoadableNodeModal;
