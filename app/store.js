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
          id: '8',
          text: 'It all begins here!',
          color: '#FFFFFF',
          column: 'inputs',
          links: ['7']
        }
      ],
      activities: [
        {
          id: '5',
          text: 'Blah Blah',
          color: '#FFB3EC',
          column: 'activities',
          links: ['3']
        },
        {
          id: '6',
          text: 'Yet Another Card!',
          color: '#75FF98',
          column: 'activities',
          links: ['3']
        },
        {
          id: '7',
          text: 'Derp Derp',
          color: '#FFFFFF',
          column: 'activities',
          links: ['3'],
        }
      ],
      outputs: [
        {
          id: '3',
          text: 'A Linked Output',
          color: '#FFB3EC',
          column: 'outputs',
          links: ['2']
        },
        {
          id: '4',
          text: 'A Non-Linked Output',
          color: '#FFFFFF',
          column: 'outputs',
          links: ['2']
        }
      ],
      outcomes: [
        {
          id: '2',
          text: 'A Linked Outcome',
          color: '#75FF98',
          column: 'outcomes',
          links: ['1']
        }
      ],
      impact: [
        {
          id: '1',
          text: 'Some Impact',
          color: '#FFFFFF',
          column: 'impact',
          links: []
        }
      ]
    }
  };

  const store = createStore(reducer, state, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  store.dispatch({ type: VALIDATE_MODEL, payload: state.cards });

  return store;
}
