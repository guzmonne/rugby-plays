import './_styles/normalizr.css';
import './_styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.js';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/App.js', () => {
    var NextApp = require('./containers/App.js').default;
    ReactDOM.render(
      <NextApp />,
      document.getElementById('root')
    );
  });
}
