const inviteReducer = require("../reducers/invite");

const getInvitesByUserId = async (userId, io) => {
  const invites = await inviteReducer.getByUserId(userId);
  io.emit('invites', invites);
};

// const createComment = async (comment, io) => {
//   await commentReducer.create(comment);

//   getCommentsByTaskId(comment.taskId, io);
// }

module.exports = {
  getInvitesByUserId,
  // createComment,
}