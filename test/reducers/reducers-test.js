import { VIEW_MODE, EDIT_MODE, DEFAULT_COLOR } from '../../app/constants';
import * as actionTypes from '../../app/actions/types';
import { cardsReducer, titleReducer, titleModeReducer } from '../../app/reducers';

describe('Reducers', () => {
  describe('Card Reducer', () => {
    it('adds a new card in the proper column', () => {
      const expected = {
        inputs: [{ id: 'abc', text: 'New Card', column: 'inputs', color: DEFAULT_COLOR }],
        activities: [],
        outputs: [],
        outcomes: [],
        impact: []
      };

      const action = {
        type: actionTypes.ADD_CARD,
        payload: {
          id: 'abc',
          text: 'New Card',
          color: DEFAULT_COLOR,
          column: 'inputs'
        }
      };

      expect(cardsReducer(undefined, action)).toEqual(expected);
    });

    it('deletes a card', () => {
      const startState = {
        inputs: [{ id: 'abc', text: 'Delete Me', column: 'inputs', color: 'red' },
                 { id: 'def', text: 'Other Card', column: 'inputs', color: 'blue' }],
        activities: [],
        outputs: [],
        outcomes: [],
        impact: []
      };

      const expectedState = {
        inputs: [{ id: 'def', text: 'Other Card', column: 'inputs', color: 'blue' }],
        activities: [],
        outputs: [],
        outcomes: [],
        impact: []
      };

      const action = {
        type: actionTypes.DELETE_CARD,
        payload: {
          id: 'abc',
          column: 'inputs',
        }
      };

      expect(cardsReducer(startState, action)).toEqual(expectedState);
    });

    it('updates a card', () => {
      const startState = {
        inputs: [{ id: 'abc', text: 'Old Text', column: 'inputs', color: 'green' },
                 { id: 'def', text: 'Other Card', column: 'inputs', color: 'yellow' }],
        activities: [],
        outputs: [],
        outcomes: [],
        impact: []
      };

      const expectedState = {
        inputs: [{ id: 'abc', text: 'New Text', column: 'inputs', color: 'blue' },
                 { id: 'def', text: 'Other Card', column: 'inputs', color: 'yellow' }],
        activities: [],
        outputs: [],
        outcomes: [],
        impact: []
      };

      const action = {
        type: actionTypes.UPDATE_CARD,
        payload: {
          id: 'abc',
          text: 'New Text',
          color: 'blue',
          column: 'inputs'
        }
      };

      expect(cardsReducer(startState, action)).toEqual(expectedState);
    });

    it('moves a card to a different column', () => {
      const startState = {
        inputs: [{ id: 'abc', text: 'Move Me', column: 'inputs', color: 'green' },
                 { id: 'def', text: 'Other Card', column: 'inputs', color: 'yellow' }],
        activities: [],
        outputs: [],
        outcomes: [],
        impact: []
      };

      const expectedState = {
        inputs: [{ id: 'def', text: 'Other Card', column: 'inputs', color: 'yellow' }],
        activities: [{ id: 'abc', text: 'Move Me', column: 'activities', color: 'green' }],
        outputs: [],
        outcomes: [],
        impact: []
      };

      const action = {
        type: actionTypes.MOVE_CARD,
        payload: {
          sourceColumn: 'inputs',
          sourceId: 'abc',
          targetColumn: 'activities',
          targetId: 'def'
        }
      };

      expect(cardsReducer(startState, action)).toEqual(expectedState);
    });

    it('moves a card within the same column', () => {
      const startState = {
        inputs: [{ id: 'abc', text: 'Move Me', column: 'inputs', color: 'green' },
                 { id: 'def', text: 'Other Card', column: 'inputs', color: 'yellow' }],
        activities: [],
        outputs: [],
        outcomes: [],
        impact: []
      };

      const expectedState = {
        inputs: [{ id: 'def', text: 'Other Card', column: 'inputs', color: 'yellow' },
                 { id: 'abc', text: 'Move Me', column: 'inputs', color: 'green' }],
        activities: [],
        outputs: [],
        outcomes: [],
        impact: []
      };

      const action = {
        type: actionTypes.MOVE_CARD,
        payload: {
          sourceColumn: 'inputs',
          sourceId: 'abc',
          targetColumn: 'inputs',
          targetId: 'def'
        }
      };

      expect(cardsReducer(startState, action)).toEqual(expectedState);
    });
  });

  describe('Title Reducer', () => {
    it('updates the title when the edit is saved', () => {
      const action = {
        type: actionTypes.EDIT_TITLE_SAVE,
        payload: 'new title'
      };

      expect(titleReducer('old title', action)).toEqual('new title');
    });

    it('does not update the title when the edit is cancelled', () => {
      const action = {
        type: actionTypes.EDIT_TITLE_CANCEL
      };

      expect(titleReducer('old title', action)).toEqual('old title');
    });
  });

  describe('Title Mode Reducer', () => {
    it('changes to edit mode on edit', () => {
      const action = {
        type: actionTypes.EDIT_TITLE
      };

      expect(titleModeReducer(VIEW_MODE, action)).toEqual(EDIT_MODE);
    });

    it('changes to view mode on cancel', () => {
      const action = {
        type: actionTypes.EDIT_TITLE_CANCEL
      };

      expect(titleModeReducer(EDIT_MODE, action)).toEqual(VIEW_MODE);
    });

    it('changes to view mode on save', () => {
      const action = {
        type: actionTypes.EDIT_TITLE_SAVE
      };

      expect(titleModeReducer(EDIT_MODE, action)).toEqual(VIEW_MODE);
    });
  });
});
