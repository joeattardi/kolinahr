import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import cardsReducer from './reducers/cardsReducer';
import { columnOffsetsReducer, cardOffsetsReducer } from './reducers/offsetReducers';
import validationReducer from './reducers/validationReducer';
import modelsReducer from './reducers/modelsReducer';
import * as reducers from './reducers';

export default function configureStore() {
  const reducer = combineReducers({
    cards: cardsReducer,
    titleMode: reducers.titleModeReducer,
    title: reducers.titleReducer,
    cardOffsets: cardOffsetsReducer,
    columnOffsets: columnOffsetsReducer,
    hovering: reducers.hoverReducer,
    dragging: reducers.dragReducer,
    validationErrors: validationReducer,
    saving: reducers.savingReducer,
    loading: reducers.loadingReducer,
    notification: reducers.notificationReducer,
    allModels: modelsReducer,
    currentModel: reducers.currentModelReducer,
    auth: reducers.authReducer,
    user: reducers.userReducer,
    userList: reducers.userListReducer,
    editingCard: reducers.editingCardReducer,
    cardEditMode: reducers.cardEditModeReducer,
    privateModel: reducers.privateModelReducer
  });

  const store = createStore(reducer, {}, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
