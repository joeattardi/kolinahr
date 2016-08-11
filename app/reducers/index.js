import { ADD_CARD } from '../actions/types';

const defaultCardsState = {
  inputs: [],
  activities: [],
  outputs: [],
  outcomes: [],
  impact: []
};
/* eslint-disable import/prefer-default-export */

export function cardsReducer(state = defaultCardsState, action) {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        ...{ [action.payload]: [...state[action.payload], { text: 'New Card' }] }
      };
    default:
      return state;
  }
}
