import { VALIDATE_MODEL } from '../actions/types';

const INCOMING_LINK_NAMES = {
  activities: 'Input',
  outputs: 'Activity',
  outcomes: 'Output',
  impact: 'Outcome'
};

const OUTGOING_LINK_NAMES = {
  inputs: 'Activity',
  activities: 'Output',
  outputs: 'Outcome',
  outcomes: 'Impact'
};

function findLinksToCard(cardId, allCards) {
  const links = [];

  Object.keys(allCards).forEach(columnId => {
    allCards[columnId].forEach(card => {
      if (card.links.indexOf(cardId) >= 0) {
        links.push(card.id);
      }
    });
  });

  return links;
}

function validate(allCards) {
  const validationErrors = {};

  Object.keys(allCards).forEach(columnId => {
    allCards[columnId].forEach(card => {
      if (columnId !== 'impact' && card.links.length === 0) {
        validationErrors[card.id] = `This must link to at least one ${OUTGOING_LINK_NAMES[columnId]}.`; 
      }

      if (columnId !== 'inputs' && findLinksToCard(card.id, allCards).length === 0) {
        validationErrors[card.id] = `This must be linked to by at least one ${INCOMING_LINK_NAMES[columnId]}.`;
      }
    });
  });

  return validationErrors;
}

export default function validationReducer(state = {}, action) {
  switch (action.type) {
    case VALIDATE_MODEL:
      return validate(action.payload);
    default:
      return state;
  }
}
