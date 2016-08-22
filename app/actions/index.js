import uuid from 'uuid';

import { DEFAULT_COLOR, DEFAULT_TEXT } from '../constants';
import * as types from './types';

export function startDrag(cardId) {
  return {
    type: types.START_DRAG,
    payload: cardId
  };
}

export function endDrag() {
  return {
    type: types.END_DRAG
  };
}

export function addCard(column) {
  return (dispatch, getState) => {
    dispatch({
      type: types.ADD_CARD,
      payload: {
        column,
        id: uuid.v4(),
        color: DEFAULT_COLOR,
        text: DEFAULT_TEXT,
        links: []
      }
    });

    dispatch({
      type: types.VALIDATE_MODEL,
      payload: getState().cards
    });
  };
}

export function updateCard(card) {
  return (dispatch, getState) => {
    dispatch({
      type: types.UPDATE_CARD,
      payload: card
    });

    dispatch({
      type: types.VALIDATE_MODEL,
      payload: getState().cards
    });
  };
}

export function deleteCard(id, column) {
  return (dispatch, getState) => {
    dispatch({
      type: types.DELETE_CARD,
      payload: {
        id,
        column
      }
    });

    dispatch({
      type: types.VALIDATE_MODEL,
      payload: getState().cards
    });
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

export function registerColumnOffset(columnId, offset) {
  return {
    type: types.REGISTER_COLUMN_OFFSET,
    payload: {
      columnId,
      offset
    }
  };
}

export function registerOffset(cardId, offset) {
  return {
    type: types.REGISTER_OFFSET,
    payload: {
      cardId,
      offset
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
