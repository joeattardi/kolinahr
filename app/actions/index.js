import uuid from 'uuid';
import axios from 'axios';
import { browserHistory } from 'react-router';

import * as types from './types';
import { TITLE, NOTIFICATION_SUCCESS, NOTIFICATION_ERROR } from '../constants';

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
    axios.get('/api/models', {
      headers: { authorization: localStorage.getItem('token') }
    }).then(result => {
      dispatch({ type: types.LOAD_MODEL_LIST, payload: result.data });
      dispatch({ type: types.LOAD_COMPLETE });
    }).catch(err => {
      dispatch(showNotification(NOTIFICATION_ERROR,
        `Failed to load logic models: ${err.message}`));
      dispatch({ type: types.LOAD_COMPLETE });
    });
  };
}

export function deleteModel(modelId) {
  return dispatch => {
    axios.delete(`/api/models/${modelId}`, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(() => {
      dispatch({ type: types.DELETE_MODEL, payload: modelId });
      dispatch(showNotification(NOTIFICATION_SUCCESS, 'The logic model was deleted.'));
    }).catch(err => {
      dispatch(showNotification(NOTIFICATION_ERROR,
        `Failed to delete logic model: ${err.message}`));
      dispatch({ type: types.LOAD_COMPLETE });
    });
  };
}

/* eslint-disable no-underscore-dangle */
export function createModel(title) {
  return () => {
    axios.post('/api/models', { title }, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(result => {
      browserHistory.push(`/edit/${result.data._id}`);
    });
  };
}

export function copyModel(modelId, title) {
  return () => {
    axios.post(`/api/models/${modelId}`, { title }, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(result => {
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
    axios.get(`/api/models/${modelId}`, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(result => {
      dispatch({ type: types.LOAD_COMPLETE });
      dispatch(loadData(result.data));
      document.title = `${TITLE} - ${result.data.title}`;
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
      private: state.privateModel,
      title: state.title,
      cards: state.cards
    };

    dispatch({ type: types.SAVE_BEGIN });
    axios.put(`/api/models/${state.currentModel}`, payload, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(() => {
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

export function startHover(cardId) {
  return {
    type: types.START_HOVER,
    payload: cardId
  };
}

export function endHover(cardId) {
  return {
    type: types.END_HOVER,
    payload: cardId
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

export function editCard(card, mode) {
  return {
    type: types.EDIT_CARD,
    payload: {
      card,
      mode
    }
  };
}

export function editCardCancel() {
  return {
    type: types.EDIT_CARD_CANCEL
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
  document.title = `${TITLE} - ${newTitle}`;
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

export function setDirty(dirty) {
  return {
    type: types.SET_DIRTY,
    payload: dirty
  };
}

export function deauthUser() {
  return {
    type: types.DEAUTH_USER
  };
}

export function setPrivate(privateModel) {
  return {
    type: types.SET_PRIVATE,
    payload: privateModel
  };
}

export function getUser() {
  return dispatch => {
    axios.get('/api/user', {
      headers: { authorization: localStorage.getItem('token') }
    }).then(response => {
      dispatch({
        type: types.SET_USER,
        payload: response.data
      });
      dispatch({
        type: types.AUTH_USER
      });
    });
  };
}
