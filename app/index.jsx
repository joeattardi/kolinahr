import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import configureStore from './store';
import App from './App';
import { loadData } from './actions';
import './scss/index.scss';
import './images/logo.png';

const store = configureStore();

axios.get('/model')
  .then(response => {
    store.dispatch(loadData(response.data));
  });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'));

