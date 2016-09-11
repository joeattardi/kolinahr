import validationReducer from '../../app/reducers/validationReducer';
import { VALIDATE_MODEL } from '../../app/actions/types';

describe('Validation Reducer', () => {
  it('sets a validation error if a card is not linked to another card', () => {
    const cards = {
      inputs: [],
      activities: [],
      outputs: [{
        id: '2',
        column: 'outputs',
        text: 'Some Output',
        links: ['1']
      }],
      outcomes: [{
        id: '1',
        column: 'outcomes',
        text: 'Some Outcome',
        links: []
      }],
      impact: []
    };

    expect(validationReducer({}, {
      type: VALIDATE_MODEL,
      payload: cards
    })).toEqual({
      1: 'This Outcome must link to at least one Impact.',
      2: 'This Output must be linked to by at least one Activity.'
    });
  });
});
