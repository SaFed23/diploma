const { getCommentsByTaskId, createComment } = require("./comments");
const {
  getInvitesByUserId,
  rejectInvite,
  acceptInvite,
  createInvite,
} = require("./invites");

const onConnection = (socket, io) => {
  socket.on('comment:add', (comment) => createComment(comment, io));
  socket.on('comment:get', (taskId) => getCommentsByTaskId(taskId, io));

  socket.on('invite:get', (userId) => getInvitesByUserId(userId, io));
  socket.on('invite:reject', (invite) => rejectInvite(invite, io));
  socket.on('invite:accept', (invite) => acceptInvite(invite, io));
  socket.on('invite:create', (invite) => createInvite(invite, io));

  socket.on('disconnect', () => { });
}

module.exports = onConnection;