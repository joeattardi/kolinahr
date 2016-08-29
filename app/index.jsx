import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from './store';
import App from './App';
import ModelDetail from './components/ModelDetail';
import ModelList from './components/ModelList';
import './scss/index.scss';
import './images/logo.png';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ModelList} />
        <Route path="edit" component={ModelDetail} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'));

