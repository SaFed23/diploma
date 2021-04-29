const { getCommentsByTaskId, createComment } = require("./comments");

const onConnection = (socket, io) => {
  console.log('User connected')

  const { taskId } = socket.handshake.query
  socket.taskId = taskId;

  socket.join(taskId);

  socket.on('comment:add', (comment) => createComment(comment, io));
  socket.on('comment:get', () => getCommentsByTaskId(taskId, io))

  socket.on('disconnect', () => {
    console.log('User disconnected')
    socket.leave(taskId);
  })
}

module.exports = onConnection;