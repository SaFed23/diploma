const { getCommentsByTaskId, createComment } = require("./comments");
const { getInvitesByUserId } = require("./invites");

const onConnection = (socket, io) => {
  console.log('User connected');

  socket.on('comment:add', (comment) => createComment(comment, io));
  socket.on('comment:get', (taskId) => getCommentsByTaskId(taskId, io));

  socket.on('invites:get', (userId) => getInvitesByUserId(userId))

  socket.on('disconnect', () => {
    console.log('User disconnected')
  });
}

module.exports = onConnection;