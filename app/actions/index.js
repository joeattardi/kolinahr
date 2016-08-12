/* eslint-disable import/prefer-default-export */
import { ADD_CARD, EDIT_TITLE, EDIT_TITLE_SAVE, EDIT_TITLE_CANCEL } from './types';

export function addCard(column) {
  return {
    type: ADD_CARD,
    payload: column
  };
}

export function editTitle() {
  return {
    type: EDIT_TITLE,
  };
}

export function editTitleSave(newTitle) {
  return {
    type: EDIT_TITLE_SAVE,
    payload: newTitle
  };
}

export function editTitleCancel() {
  return {
    type: EDIT_TITLE_CANCEL
  };
}
