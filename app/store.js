import { createStore, combineReducers, compose } from 'redux';

import { cardsReducer, titleReducer, titleModeReducer, cardOffsetsReducer } from './reducers';

export default function configureStore() {
  const reducer = combineReducers({
    cards: cardsReducer,
    titleMode: titleModeReducer,
    title: titleReducer,
    cardOffsets: cardOffsetsReducer
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
          column: 'activities'
        },
        {
          id: '4',
          text: 'Yet Another Card!',
          color: '#75FF98',
          column: 'activities'
        },
        {
          id: '5',
          text: 'Derp Derp',
          color: '#FFFFFF',
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
