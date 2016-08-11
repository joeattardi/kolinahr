import { createStore, combineReducers, compose } from 'redux';

import { cardsReducer } from './reducers';

export default function configureStore() {
  const reducer = combineReducers({
    cards: cardsReducer
  });

  return createStore(reducer, {}, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}
