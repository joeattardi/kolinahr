import { ADD_CARD } from '../../app/actions/types';
import { cardsReducer } from '../../app/reducers';

describe('Reducers', () => {
  describe('Card Reducer', () => {
    it('adds a new card in the proper column', () => {
      const expected = {
        inputs: [{ text: 'New Card' }],
        activities: [],
        outputs: [],
        outcomes: [],
        impact: []
      };

      const action = {
        type: ADD_CARD,
        payload: 'inputs'
      };

      expect(cardsReducer(undefined, action)).toEqual(expected);
    });
  });
});
