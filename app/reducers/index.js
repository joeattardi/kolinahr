import { VIEW_MODE, EDIT_MODE } from '../constants';
import * as types from '../actions/types';

export function currentModelReducer(state = null, action) {
  switch (action.type) {
    case types.LOAD_DATA:
      return action.payload._id;
    default:
      return state;
  }
}

export function notificationReducer(state = null, action) {
  switch (action.type) {
    case types.SHOW_NOTIFICATION:
      return action.payload;
    case types.HIDE_NOTIFICATION:
      return null;
    default:
      return state;
  }
}

export function savingReducer(state = false, action) {
  switch (action.type) {
    case types.SAVE_BEGIN:
      return true;
    case types.SAVE_COMPLETE:
      return false;
    default:
      return state;
  }
}

export function titleReducer(state = 'New Logic Model', action) {
  switch (action.type) {
    case types.LOAD_DATA:
      return action.payload.title;
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

export function dragReducer(state = null, action) {
  switch (action.type) {
    case types.START_DRAG:
      return action.payload;
    case types.END_DRAG:
      return null;
    default:
      return state;
  }
}
