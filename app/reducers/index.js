import { VIEW_MODE, EDIT_MODE } from '../constants';
import * as types from '../actions/types';

export function privateModelReducer(state = false, action) {
  switch (action.type) {
    case types.LOAD_DATA:
      return action.payload.private;
    case types.SET_PRIVATE:
      return action.payload;
    default:
      return state;
  }
}

export function editingCardReducer(state = false, action) {
  switch (action.type) {
    case types.EDIT_CARD:
      return action.payload.card;
    case types.ADD_CARD:
    case types.UPDATE_CARD:
    case types.DELETE_CARD:
    case types.EDIT_CARD_CANCEL:
      return false;
    default:
      return state;
  }
}

export function cardEditModeReducer(state = EDIT_MODE, action) {
  switch (action.type) {
    case types.EDIT_CARD:
      return action.payload.mode || EDIT_MODE;
    default:
      return state;
  }
}

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

export function dirtyReducer(state = false, action) {
  switch (action.type) {
    case types.MOVE_CARD:
    case types.ADD_CARD:
    case types.EDIT_TITLE:
    case types.UPDATE_CARD:
    case types.DELETE_CARD:
    case types.SET_PRIVATE:
      return true;
    case types.SAVE_COMPLETE:
      return false;
    case types.SET_DIRTY:
      return action.payload;
    default:
      return state;
  }
}

export function loadingReducer(state = false, action) {
  switch (action.type) {
    case types.LOAD_BEGIN:
      return true;
    case types.LOAD_COMPLETE:
      return false;
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

export function hoverReducer(state = null, action) {
  switch (action.type) {
    case types.START_HOVER:
      return action.payload;
    case types.END_HOVER:
      return null;
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

export function authReducer(state = false, action) {
  switch (action.type) {
    case types.AUTH_USER:
      return true;
    case types.DEAUTH_USER:
      return false;
    default:
      return state;
  }
}

export function userReducer(state = {}, action) {
  switch (action.type) {
    case types.SET_USER:
      return action.payload;
    case types.DEAUTH_USER:
      return {};
    default:
      return state;
  }
}
