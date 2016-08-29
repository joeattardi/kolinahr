import { LOAD_MODEL_LIST } from '../actions/types';

export default function modelsReducer(state = [], action) {
  switch (action.type) {
    case LOAD_MODEL_LIST:
      return action.payload;
    default:
      return state;
  }
}
