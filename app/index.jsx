import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import configureStore from './store';
import App from './App';
import { showNotification, loadData } from './actions';
import { NOTIFICATION_ERROR } from './constants';
import './scss/index.scss';
import './images/logo.png';

const store = configureStore();

axios.get('/model')
  .then(response => {
    store.dispatch(loadData(response.data));
  })
  .catch(err => {
    store.dispatch(showNotification(NOTIFICATION_ERROR,
      `Failed to load logic model: ${err.message}`));
  });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'));

