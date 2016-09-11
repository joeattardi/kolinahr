import { VIEW_MODE, EDIT_MODE, DEFAULT_COLOR } from '../../app/constants';
import * as actionTypes from '../../app/actions/types';
import cardsReducer from '../../app/reducers/cardsReducer';
import * as offsetReducers from '../../app/reducers/offsetReducers';
import * as reducers from '../../app/reducers';
import modelsReducer from '../../app/reducers/modelsReducer';

describe('Reducers', () => {
  describe('Models Reducer', () => {
    it('sets the list of models', () => {
      const models = [
        { _id: 'abc', cards: {} },
        { _id: 'def', cards: {} }
      ];

      expect(modelsReducer([], {
        type: actionTypes.LOAD_MODEL_LIST,
        payload: models
      })).toEqual(models);
    });

    it('deletes a model', () => {
      const models = [
        { _id: 'abc', cards: {} },
        { _id: 'def', cards: {} }
      ];

      expect(modelsReducer(models, {
        type: actionTypes.DELETE_MODEL,
        payload: 'def'
      })).toEqual([
        { _id: 'abc', cards: {} }
      ]);
    });
  });

  describe('User Reducer', () => {
    it('sets the current user on login', () => {
      expect(reducers.userReducer({}, {
        type: actionTypes.SET_USER,
        payload: { id: '123' }
      })).toEqual({ id: '123' });
    });
  });

  describe('Auth Reducer', () => {
    it('sets the auth state to true', () => {
      expect(reducers.authReducer(false, {
        type: actionTypes.AUTH_USER
      })).toEqual(true);
    });

    it('sets the auth state to false', () => {
      expect(reducers.authReducer(true, {
        type: actionTypes.DEAUTH_USER
      })).toEqual(false);
    });
  });

  describe('Drag Reducer', () => {
    it('sets the dragging state when a drag event begins', () => {
      expect(reducers.dragReducer(null, {
        type: actionTypes.START_DRAG,
        payload: { id: 'abc' }
      })).toEqual({ id: 'abc' });
    });

    it('clears the dragging state when a drag event ends', () => {
      expect(reducers.dragReducer({ id: 'abc' }, {
        type: actionTypes.END_DRAG
      })).toEqual(null);
    });
  });

  describe('Saving Reducer', () => {
    it('sets the saving state to true when beginning a save operation', () => {
      expect(reducers.savingReducer(false, { type: actionTypes.SAVE_BEGIN })).toEqual(true);
    });

    it('sets the saving state to false when completing a save operation', () => {
      expect(reducers.savingReducer(true, { type: actionTypes.SAVE_COMPLETE })).toEqual(false);
    });
  });

  describe('Loading Reducer', () => {
    it('sets the loading state to true when beginning a load operation', () => {
      expect(reducers.loadingReducer(false, { type: actionTypes.LOAD_BEGIN })).toEqual(true);
    });

    it('sets the loading state to false when loading is complete', () => {
      expect(reducers.loadingReducer(true, { type: actionTypes.LOAD_COMPLETE })).toEqual(false);
    });
  });

  describe('Dirty Reducer', () => {
    it('marks the state as dirty when moving a card', () => {
      expect(reducers.dirtyReducer(false, { type: actionTypes.MOVE_CARD })).toEqual(true);
    });

    it('marks the state as dirty when adding a card', () => {
      expect(reducers.dirtyReducer(false, { type: actionTypes.ADD_CARD })).toEqual(true);
    });

    it('marks the state as dirty when editing the title', () => {
      expect(reducers.dirtyReducer(false, { type: actionTypes.EDIT_TITLE })).toEqual(true);
    });

    it('marks the state as dirty when updating a card', () => {
      expect(reducers.dirtyReducer(false, { type: actionTypes.UPDATE_CARD })).toEqual(true);
    });

    it('marks the state as dirty when deleting a card', () => {
      expect(reducers.dirtyReducer(false, { type: actionTypes.DELETE_CARD })).toEqual(true);
    });

    it('marks the state as not dirty when saving data', () => {
      expect(reducers.dirtyReducer(true, { type: actionTypes.SAVE_COMPLETE })).toEqual(false);
    });

    it('explicitly sets the dirty state to true', () => {
      expect(reducers.dirtyReducer(false, {
        type: actionTypes.SET_DIRTY,
        payload: true
      })).toEqual(true);
    });

    it('explicitly sets the dirty state to false', () => {
      expect(reducers.dirtyReducer(true, {
        type: actionTypes.SET_DIRTY,
        payload: false
      })).toEqual(false);
    });
  });

  describe('Notification Reducer', () => {
    it('sets the notification on SHOW_NOTIFICATION', () => {
      const state = null;
      const action = {
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          type: 'notification-success',
          message: 'Successfully saved the logic model.'
        }
      };

      const newState = reducers.notificationReducer(state, action);
      expect(newState).toEqual({
        type: 'notification-success',
        message: 'Successfully saved the logic model.'
      });
    });

    it('clears the notification on HIDE_NOTIFICATION', () => {
      const state = {
        type: 'notification-success',
        message: 'Successfully saved the logic model.'
      };

      const action = {
        type: actionTypes.HIDE_NOTIFICATION
      };

      const newState = reducers.notificationReducer(state, action);
      expect(newState).toEqual(null);
    });
  });

  describe('Current Model Reducer', () => {
    it('sets the model ID when data is loaded', () => {
      const state = 'model-123';
      const newState = reducers.currentModelReducer(state, {
        type: actionTypes.LOAD_DATA,
        payload: {
          _id: 'model-456'
        }
      });

      expect(newState).toEqual('model-456');
    });
  });

  describe('Column Offsets Reducer', () => {
    it('clears out old offset data when a new model is loaded', () => {
      const state = {
        inputs: { top: 0, left: 0, width: 100, height: 100 },
        activities: { top: 0, left: 100, width: 100, height: 100 }
      };

      const newState = offsetReducers.columnOffsetsReducer(state, { type: actionTypes.LOAD_DATA });
      expect(newState).toEqual({});
    });

    it('registers a new offset', () => {
      const state = {
        inputs: { top: 0, left: 0, width: 100, height: 100 }
      };

      const action = {
        type: actionTypes.REGISTER_COLUMN_OFFSET,
        payload: {
          columnId: 'activities',
          offset: { top: 0, left: 100, width: 100, height: 100 }
        }
      };

      const newState = offsetReducers.columnOffsetsReducer(state, action);

      expect(newState).toEqual({
        inputs: { top: 0, left: 0, width: 100, height: 100 },
        activities: { top: 0, left: 100, width: 100, height: 100 }
      });
    });
  });

  describe('Card Offsets Reducer', () => {
    it('clears out old offset data when a new model is loaded', () => {
      const state = {
        a: { top: 0, left: 0, width: 100, height: 100 },
        b: { top: 100, left: 0, width: 100, height: 100 }
      };

      const newState = offsetReducers.cardOffsetsReducer(state, { type: actionTypes.LOAD_DATA });
      expect(newState).toEqual({});
    });

    it('removes the offsets for a deleted card', () => {
      const state = {
        a: { top: 0, left: 0, width: 100, height: 100 },
        b: { top: 100, left: 0, width: 100, height: 100 }
      };

      const action = {
        type: actionTypes.DELETE_CARD,
        payload: { id: 'a' }
      };

      const newState = offsetReducers.cardOffsetsReducer(state, action);
      expect(newState).toEqual({
        b: { top: 100, left: 0, width: 100, height: 100 }
      });
    });

    it('adds a newly registered offset', () => {
      const state = {
        a: { top: 0, left: 0, width: 100, height: 100 }
      };

      const action = {
        type: actionTypes.REGISTER_OFFSET,
        payload: { cardId: 'b', offset: { top: 100, left: 0, width: 100, height: 100 } }
      };

      const newState = offsetReducers.cardOffsetsReducer(state, action);

      expect(newState).toEqual({
        a: { top: 0, left: 0, width: 100, height: 100 },
        b: { top: 100, left: 0, width: 100, height: 100 }
      });
    });
  });

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
        inputs: [{ id: 'abc', text: 'Some Card', column: 'inputs', color: 'red', links: ['ghi'] },
                 { id: 'def', text: 'Other Card', column: 'inputs', color: 'blue', links: [] }],
        activities: [
          { id: 'ghi', text: 'Delete Me', column: 'activities', color: 'green', links: [] }
        ],
        outputs: [],
        outcomes: [],
        impact: []
      };

      const expectedState = {
        inputs: [{ id: 'abc', text: 'Some Card', column: 'inputs', color: 'red', links: [] },
                 { id: 'def', text: 'Other Card', column: 'inputs', color: 'blue', links: [] }],
        activities: [],
        outputs: [],
        outcomes: [],
        impact: []
      };

      const action = {
        type: actionTypes.DELETE_CARD,
        payload: {
          id: 'ghi',
          column: 'activities',
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

      expect(reducers.titleReducer('old title', action)).toEqual('new title');
    });

    it('does not update the title when the edit is cancelled', () => {
      const action = {
        type: actionTypes.EDIT_TITLE_CANCEL
      };

      expect(reducers.titleReducer('old title', action)).toEqual('old title');
    });
  });

  describe('Title Mode Reducer', () => {
    it('changes to edit mode on edit', () => {
      const action = {
        type: actionTypes.EDIT_TITLE
      };

      expect(reducers.titleModeReducer(VIEW_MODE, action)).toEqual(EDIT_MODE);
    });

    it('changes to view mode on cancel', () => {
      const action = {
        type: actionTypes.EDIT_TITLE_CANCEL
      };

      expect(reducers.titleModeReducer(EDIT_MODE, action)).toEqual(VIEW_MODE);
    });

    it('changes to view mode on save', () => {
      const action = {
        type: actionTypes.EDIT_TITLE_SAVE
      };

      expect(reducers.titleModeReducer(EDIT_MODE, action)).toEqual(VIEW_MODE);
    });
  });
});
