import { DELETE_MODEL, LOAD_MODEL_LIST } from '../actions/types';

export default function modelsReducer(state = [], action) {
  switch (action.type) {
    case LOAD_MODEL_LIST:
      return action.payload;
    case DELETE_MODEL:
      return state.filter(model => model._id !== action.payload);
    default:
      return state;
  }
}
