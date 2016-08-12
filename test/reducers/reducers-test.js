import { VIEW_MODE, EDIT_MODE } from '../../app/constants';
import { ADD_CARD, EDIT_TITLE, EDIT_TITLE_SAVE, EDIT_TITLE_CANCEL } from '../../app/actions/types';
import { cardsReducer, titleReducer, titleModeReducer } from '../../app/reducers';

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

  describe('Title Reducer', () => {
    it('updates the title when the edit is saved', () => {
      const action = {
        type: EDIT_TITLE_SAVE,
        payload: 'new title'
      };

      expect(titleReducer('old title', action)).toEqual('new title');
    });

    it('does not update the title when the edit is cancelled', () => {
      const action = {
        type: EDIT_TITLE_CANCEL
      };

      expect(titleReducer('old title', action)).toEqual('old title');
    });
  });

  describe('Title Mode Reducer', () => {
    it('changes to edit mode on edit', () => {
      const action = {
        type: EDIT_TITLE
      };

      expect(titleModeReducer(VIEW_MODE, action)).toEqual(EDIT_MODE);
    });

    it('changes to view mode on cancel', () => {
      const action = {
        type: EDIT_TITLE_CANCEL
      };

      expect(titleModeReducer(EDIT_MODE, action)).toEqual(VIEW_MODE);
    });

    it('changes to view mode on save', () => {
      const action = {
        type: EDIT_TITLE_SAVE
      };

      expect(titleModeReducer(EDIT_MODE, action)).toEqual(VIEW_MODE);
    });
  });
});
