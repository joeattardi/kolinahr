import uuid from 'uuid';

import { DEFAULT_COLOR, DEFAULT_TEXT } from '../constants';
import * as types from './types';

export function addCard(column) {
  return {
    type: types.ADD_CARD,
    payload: {
      column,
      id: uuid.v4(),
      color: DEFAULT_COLOR,
      text: DEFAULT_TEXT,
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

export function moveCard(sourceColumn, sourceId, targetColumn, targetId) {
  return {
    type: types.MOVE_CARD,
    payload: {
      sourceColumn,
      sourceId,
      targetColumn,
      targetId
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
