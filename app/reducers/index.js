import { VIEW_MODE, EDIT_MODE } from '../constants';
import * as types from '../actions/types';

const defaultCardsState = {
  inputs: [],
  activities: [],
  outputs: [],
  outcomes: [],
  impact: []
};

export function cardsReducer(state = defaultCardsState, action) {
  switch (action.type) {
    case types.ADD_CARD:
      return {
        ...state,
        ...{ [action.payload.column]: [...state[action.payload.column], action.payload] }
      };
    case types.DELETE_CARD:
      return {
        ...state,
        ...{ [action.payload.column]: state[action.payload.column].filter(card =>
          card.id !== action.payload.id
        ) }
      };
    case types.UPDATE_CARD:
      return {
        ...state,
        ...{ [action.payload.column]: state[action.payload.column].map(card => {
          if (card.id === action.payload.id) {
            return action.payload;
          }

          return card;
        }) }
      };
    default:
      return state;
  }
}

export function titleReducer(state = 'New Logic Model', action) {
  switch (action.type) {
    case types.EDIT_TITLE_SAVE:
      return action.payload;
    case types.EDIT_TITLE_CANCEL:
      return state;
    default:
      return state;
  }
}

export function titleModeReducer(state = VIEW_MODE, action) {
  switch (action.type) {
    case types.EDIT_TITLE:
      return EDIT_MODE;
    case types.EDIT_TITLE_SAVE:
    case types.EDIT_TITLE_CANCEL:
      return VIEW_MODE;
    default:
      return state;
  }
}
