const Server = require('socket.io');

const io = new Server();

io.on('connection', socket => {
  console.log('user connected');

  socket.on('editAction', action => {
    socket.broadcast.emit('editAction', action);
  });
});
