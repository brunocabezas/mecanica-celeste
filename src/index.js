import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './app/AppContainer';
import registerServiceWorker from './registerServiceWorker';
import './_index.styl';

ReactDOM.render(<AppContainer />, document.getElementById('root'));
registerServiceWorker();
