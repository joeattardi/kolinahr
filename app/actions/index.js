import uuid from 'uuid';
import axios from 'axios';
import { browserHistory } from 'react-router';

import * as types from './types';
import { NOTIFICATION_SUCCESS, NOTIFICATION_ERROR } from '../constants';

export function showNotification(type, message) {
  return {
    type: types.SHOW_NOTIFICATION,
    payload: {
      type,
      message
    }
  };
}

export function hideNotification() {
  return {
    type: types.HIDE_NOTIFICATION
  };
}

export function loadModels() {
  return (dispatch) => {
    dispatch({ type: types.LOAD_BEGIN });
    axios.get('/api/models')
      .then(result => {
        dispatch({ type: types.LOAD_MODEL_LIST, payload: result.data });
        dispatch({ type: types.LOAD_COMPLETE });
      });
  };
}

export function deleteModel(modelId) {
  return dispatch => {
    axios.delete(`/api/models/${modelId}`)
      .then(() => {
        dispatch({ type: types.DELETE_MODEL, payload: modelId });
        dispatch(showNotification(NOTIFICATION_SUCCESS, 'The logic model was deleted.'));
      });
  };
}

/* eslint-disable no-underscore-dangle */
export function createModel(title) {
  return () => {
    axios.post('/api/models', { title })
      .then(result => {
        browserHistory.push(`/edit/${result.data._id}`);
      });
  };
}

export function copyModel(modelId, title) {
  return () => {
    axios.post(`/api/models/${modelId}`, { title })
      .then(result => {
        browserHistory.push(`/edit/${result.data._id}`);
      });
  };
}

export function loadData(model) {
  return {
    type: types.LOAD_DATA,
    payload: model
  };
}

export function loadModel(modelId) {
  return dispatch => {
    dispatch({ type: types.LOAD_BEGIN });
    axios.get(`/api/models/${modelId}`)
      .then(result => {
        dispatch({ type: types.LOAD_COMPLETE });
        dispatch(loadData(result.data));
      })
      .catch(err => {
        dispatch(showNotification(NOTIFICATION_ERROR,
          `Failed to load logic model: ${err.message}`));
      });
  };
}

export function saveData() {
  return (dispatch, getState) => {
    const state = getState();
    const payload = {
      _id: state.currentModel,
      title: state.title,
      cards: state.cards
    };

    dispatch({ type: types.SAVE_BEGIN });
    axios.put(`/api/models/${state.currentModel}`, payload)
      .then(() => {
        dispatch({ type: types.SAVE_COMPLETE });
        dispatch(showNotification(NOTIFICATION_SUCCESS,
          'Successfully saved the logic model.'
        ));
      })
      .catch(err => {
        dispatch({ type: types.SAVE_COMPLETE });
        dispatch(showNotification(NOTIFICATION_ERROR,
          `Failed to save the logic model: ${err.message}`
        ));
      });
  };
}

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

export function addCard(column, card) {
  return (dispatch, getState) => {
    dispatch({
      type: types.ADD_CARD,
      payload: {
        column,
        id: uuid.v4(),
        color: card.color,
        text: card.text,
        links: card.links
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
