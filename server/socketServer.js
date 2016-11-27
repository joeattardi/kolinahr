const Server = require('socket.io');
const jwt = require('jwt-simple');
const _ = require('lodash');

const logger = require('./logger');
const config = require('../conf/config.json');
const User = require('./models/User');

let users = [];

function findUser(id) {
  return users.find(user => user.id === id);
}

function removeUser(id) {
  users = users.filter(user => user.id !== id);
}

function addUser(id) {
  users.push({ id, document: null });
}

function getUsersForDocument(document) {
  return _.uniqWith(users.filter(user => user.document === document)
    .map(user => user.user), (val, otherVal) => val._id === otherVal._id);
}

function init(server) {
  const io = new Server(server);

  io.on('connection', socket => {
    addUser(socket.id);

    socket.on('identify', token => {
      const decodedToken = jwt.decode(token, config.jwtSecret);
      User.findOne({ _id: decodedToken.sub }).then(user => {
        findUser(socket.id).user = user;
      }).catch(error => {
        logger.error(`Failed to identify user ${decodedToken.sub} from websocket:`, error.message);
      });
    });

    socket.on('startEditing', modelId => {
      const user = findUser(socket.id);
      user.document = modelId;
      socket.join(modelId);
      io.to(user.document).emit('userList', getUsersForDocument(user.document));
    });

    socket.on('stopEditing', modelId => {
      const user = findUser(socket.id);
      user.document = null;
      socket.leave(modelId);
      io.to(user.document).emit('userList', getUsersForDocument(user.document));
    });

    socket.on('editAction', action => {
      const user = findUser(socket.id);
      if (user && user.document) {
        socket.broadcast.to(user.document).emit('editAction', action);
      }
    });

    socket.on('disconnect', () => {
      const user = findUser(socket.id);
      const document = user.document;
      removeUser(socket.id);
      io.to(document).emit('userList', getUsersForDocument(document));
    });
  });
}

module.exports = {
  init
};
