/* eslint-disable import/prefer-default-export */
import { ADD_CARD } from './types';

export function addCard(column) {
  return {
    type: ADD_CARD,
    payload: column
  };
}
