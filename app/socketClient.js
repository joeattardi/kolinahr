import io from 'socket.io-client';

export default {
  init(store) {
    this.socket = io();
    this.store = store;

    this.socket.on('editAction', action => {
      this.store.dispatch(action);
    });
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
