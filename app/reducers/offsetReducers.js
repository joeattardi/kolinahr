import _ from 'lodash';

import * as types from '../actions/types';

export function columnOffsetsReducer(state = {}, action) {
  switch (action.type) {
    case types.REGISTER_COLUMN_OFFSET:
      return {
        ...state,
        [action.payload.columnId]: action.payload.offset
      };
    default:
      return state;
  }
}

export function cardOffsetsReducer(state = {}, action) {
  switch (action.type) {
    case types.DELETE_CARD:
      return _.pickBy(state, (value, key) => key !== action.payload.id);
    case types.REGISTER_OFFSET:
      return {
        ...state,
        [action.payload.cardId]: action.payload.offset
      };
    default:
      return state;
  }
}

