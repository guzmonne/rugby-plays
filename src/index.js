import './_styles/normalizr.css';
import './_styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/App.js', () => {
    var NextApp = require('./components/App.js').default;
    ReactDOM.render(
      <NextApp />,
      document.getElementById('root')
    );
  });
}
