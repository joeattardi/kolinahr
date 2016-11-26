import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from './store';
import App from './App';
import ModelDetail from './components/ModelDetail';
import ModelList from './components/ModelList';
import Login from './components/Login';
import Logout from './components/Logout';
import './scss/index.scss';
import './images/logo.png';
import './images/favicon.png';
import './images/blankPhoto.png';

const store = configureStore();

window.onbeforeunload = () => {
  if (store.getState().dirty) {
    return 'You have unsaved changes. Are you sure you want to leave?';
  }

  return undefined;
};

store.subscribe(() => {
  const dirty = store.getState().dirty;
  if (dirty && document.title.indexOf('*') !== 0) {
    document.title = `* ${document.title}`;
  } else if (!dirty && document.title.indexOf('*') === 0) {
    document.title = document.title.substring(2);
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/" component={App}>
        <IndexRoute component={ModelList} />
        <Route path="edit/:modelId" component={ModelDetail} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'));

