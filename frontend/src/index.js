import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import './index.css';
import App from './containers/App';

import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = 'application/json';

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));
