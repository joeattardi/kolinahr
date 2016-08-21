import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { VALIDATE_MODEL } from './actions/types';
import cardsReducer from './reducers/cardsReducer';
import { columnOffsetsReducer, cardOffsetsReducer } from './reducers/offsetReducers';
import validationReducer from './reducers/validationReducer';
import * as reducers from './reducers';

export default function configureStore() {
  const reducer = combineReducers({
    cards: cardsReducer,
    titleMode: reducers.titleModeReducer,
    title: reducers.titleReducer,
    cardOffsets: cardOffsetsReducer,
    columnOffsets: columnOffsetsReducer,
    dragging: reducers.dragReducer,
    validationErrors: validationReducer
  });

  const state = {
    title: 'My New Logic Model',
    titleMode: 'VIEW_MODE',
    cards: {
      inputs: [
        {
          id: '1',
          text: 'Hello World',
          color: '#FFFFFF',
          column: 'inputs',
          links: ['3']
        },
        {
          id: '2',
          text: 'Another Card',
          color: '#B3ECFF',
          column: 'inputs',
          links: ['4']
        }
      ],
      activities: [
        {
          id: '3',
          text: 'Blah Blah',
          color: '#FFB3EC',
          column: 'activities',
          links: []
        },
        {
          id: '4',
          text: 'Yet Another Card!',
          color: '#75FF98',
          column: 'activities',
          links: []
        },
        {
          id: '5',
          text: 'Derp Derp',
          color: '#FFFFFF',
          column: 'activities',
          links: [],
        }
      ],
      outputs: [],
      outcomes: [],
      impact: []
    }
  };

  const store = createStore(reducer, state, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  store.dispatch({ type: VALIDATE_MODEL, payload: state.cards });

  return store;
}
