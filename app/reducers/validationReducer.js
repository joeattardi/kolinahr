import { VALIDATE_MODEL } from '../actions/types';

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

  // Find cards with no outgoing links
  Object.keys(allCards).forEach(columnId => {
    allCards[columnId].forEach(card => {
      if (columnId !== 'impact' && card.links.length === 0) {
        validationErrors[card.id] = 'NO_OUTGOING_LINKS';
      }

      if (columnId !== 'inputs' && findLinksToCard(card.id, allCards).length === 0) {
        validationErrors[card.id] = 'NO_INCOMING_LINKS';
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
