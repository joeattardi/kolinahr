import _ from 'lodash';

import * as types from '../actions/types';

const defaultCardsState = {
  inputs: [],
  activities: [],
  outputs: [],
  outcomes: [],
  impact: []
};

function moveCard(state, sourceColumnId, sourceId, targetColumnId, targetId) {
  const sourceColumn = state[sourceColumnId].slice(0);
  let targetColumn = state[targetColumnId].slice(0);

  if (sourceColumnId === targetColumnId) {
    targetColumn = sourceColumn;
  }

  const sourceIndex = _.findIndex(sourceColumn, card => card.id === sourceId);
  const targetIndex = _.findIndex(targetColumn, card => card.id === targetId);

  const sourceCard = sourceColumn.splice(sourceIndex, 1)[0];
  sourceCard.column = targetColumnId;
  targetColumn.splice(targetIndex, 0, sourceCard);

  return {
    ...state,
    ...{
      [sourceColumnId]: sourceColumn,
      [targetColumnId]: targetColumn
    }
  };
}

function deleteCard(state, column, cardId) {
  const nextState = {
    ...state,
    ...{ [column]: state[column].filter(card =>
      card.id !== cardId
    ) }
  };

  return _.mapValues(nextState, cards =>
    cards.map(card =>
      ({
        ...card,
        links: card.links.filter(link => link !== cardId)
      })
    )
  );
}

export default function cardsReducer(state = defaultCardsState, action) {
  switch (action.type) {
    case types.ADD_CARD:
      return {
        ...state,
        ...{ [action.payload.column]: [...state[action.payload.column], action.payload] }
      };
    case types.DELETE_CARD:
      return deleteCard(state, action.payload.column, action.payload.id);
    case types.UPDATE_CARD:
      return {
        ...state,
        ...{ [action.payload.column]: state[action.payload.column].map(card => {
          if (card.id === action.payload.id) {
            return action.payload;
          }

          return card;
        }) }
      };
    case types.MOVE_CARD:
      return moveCard(state, action.payload.sourceColumn,
        action.payload.sourceId, action.payload.targetColumn, action.payload.targetId);
    default:
      return state;
  }
}

