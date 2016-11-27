const Server = require('socket.io');

function init(server) {
  const io = new Server(server);

  io.on('connection', socket => {
    let room = null;

    socket.on('startEditing', modelId => {
      room = modelId;
      socket.join(modelId);
    });

    socket.on('stopEditing', modelId => {
      room = null;
      socket.leave(modelId);
    });

    socket.on('editAction', action => {
      if (room) {
        socket.broadcast.to(room).emit('editAction', action);
      }
    });
  });
}

module.exports = {
  init
};
