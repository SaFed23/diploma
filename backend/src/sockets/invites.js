const projectReducer = require("../reducers/project");
const inviteReducer = require("../reducers/invite");

const getInvitesByUserId = async (userId, io) => {
  const invites = await inviteReducer.getByUserId(userId);
  io.emit('invites', { data: invites, userId });
};

const rejectInvite = async (invite, io) => {
  await inviteReducer.deleteById(invite.id)

  getInvitesByUserId(invite.user.id, io);
};

const acceptInvite = async (invite, io) => {
  await inviteReducer.deleteById(invite.id)

  await projectReducer.addUser(invite.user, invite.project);

  io.emit('projects', { userId: invite.user.id });

  getInvitesByUserId(invite.user.id, io);
};

const createInvite = async (invite, io) => {
  const newInvite = await inviteReducer.create(invite);

  io.emit('invite:created', {
    data: {
      id: invite.projectId,
      res: !!newInvite
    }
  });

  getInvitesByUserId(newInvite.user.id, io);
};


module.exports = {
  getInvitesByUserId,
  rejectInvite,
  acceptInvite,
  createInvite,
}