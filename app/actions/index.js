import uuid from 'uuid';

import * as types from './types';

export function addCard(column) {
  return {
    type: types.ADD_CARD,
    payload: {
      column,
      id: uuid.v4(),
      text: 'New Card',
    }
  };
}

export function updateCard(card) {
  return {
    type: types.UPDATE_CARD,
    payload: card
  };
}

export function deleteCard(id, column) {
  return {
    type: types.DELETE_CARD,
    payload: {
      id,
      column
    }
  };
}

export function editTitle() {
  return {
    type: types.EDIT_TITLE,
  };
}

export function editTitleSave(newTitle) {
  return {
    type: types.EDIT_TITLE_SAVE,
    payload: newTitle
  };
}

export function editTitleCancel() {
  return {
    type: types.EDIT_TITLE_CANCEL
  };
}
