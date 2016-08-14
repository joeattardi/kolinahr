import { createStore, combineReducers, compose } from 'redux';

import { cardsReducer, titleReducer, titleModeReducer } from './reducers';

export default function configureStore() {
  const reducer = combineReducers({
    cards: cardsReducer,
    titleMode: titleModeReducer,
    title: titleReducer
  });

  const state = {
    title: 'My New Logic Model',
    titleMode: 'VIEW',
    cards: {
      inputs: [
        {
          id: '1',
          text: 'Hello World',
          color: '#FFFFFF',
          column: 'inputs'
        },
        {
          id: '2',
          text: 'Another Card',
          color: '#B3ECFF',
          column: 'inputs'
        }
      ],
      activities: [
        {
          id: '3',
          text: 'Blah Blah',
          color: '#FFB3EC',
          column: 'activities'
        },
        {
          id: '4',
          text: 'Yet Another Card!',
          color: '#75FF98',
          column: 'activities'
        }
      ],
      outputs: [],
      outcomes: [],
      impact: []
    }
  };

  return createStore(reducer, state, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}
