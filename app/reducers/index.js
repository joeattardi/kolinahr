import { VIEW_MODE, EDIT_MODE } from '../constants';
import { ADD_CARD, EDIT_TITLE, EDIT_TITLE_SAVE, EDIT_TITLE_CANCEL } from '../actions/types';

const defaultCardsState = {
  inputs: [],
  activities: [],
  outputs: [],
  outcomes: [],
  impact: []
};

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

export function titleReducer(state = 'New Logic Model', action) {
  switch (action.type) {
    case EDIT_TITLE_SAVE:
      return action.payload;
    case EDIT_TITLE_CANCEL:
      return state;
    default:
      return state;
  }
}

export function titleModeReducer(state = VIEW_MODE, action) {
  switch (action.type) {
    case EDIT_TITLE:
      return EDIT_MODE;
    case EDIT_TITLE_SAVE:
    case EDIT_TITLE_CANCEL:
      return VIEW_MODE;
    default:
      return state;
  }
}
