import { createStore, combineReducers, compose } from 'redux';

import { cardsReducer, titleReducer, titleModeReducer } from './reducers';

export default function configureStore() {
  const reducer = combineReducers({
    cards: cardsReducer,
    titleMode: titleModeReducer,
    title: titleReducer
  });

  return createStore(reducer, {}, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}
