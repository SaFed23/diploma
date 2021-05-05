const commentReducer = require("../reducers/comment");

const getCommentsByTaskId = async (taskId, io) => {
  const comments = await commentReducer.getByTaskId(taskId);
  io.emit('comments', { data: comments, taskId });
};

const createComment = async (comment, io) => {
  await commentReducer.create(comment);

  getCommentsByTaskId(comment.taskId, io);
}

module.exports = {
  getCommentsByTaskId,
  createComment,
}