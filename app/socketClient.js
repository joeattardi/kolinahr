import io from 'socket.io-client';
import { updateUserList } from './actions';

export default {
  init(store) {
    this.socket = io();

    this.socket.on('editAction', action => {
      store.dispatch(action);
    });

    this.socket.on('userList', userList => {
      store.dispatch(updateUserList(userList));
    });

    this.socket.emit('identify', localStorage.getItem('token'));
  },

  emitAction(action) {
    this.socket.emit('editAction', action);
  },

  startEditing(id) {
    this.socket.emit('startEditing', id);
  },

  stopEditing(id) {
    this.socket.emit('stopEditing', id);
  }
};
