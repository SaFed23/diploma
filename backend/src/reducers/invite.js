const generateError = require('../utils');
const Invite = require("../db/invites");
const { inviteErrors } = require('../errors');

const inviteReducer = {};

inviteReducer.create = async (invite) => {
    return await Invite.create(invite);
};

inviteReducer.getAll = async () => {
    return await Invite.find();
};

inviteReducer.getById = async (inviteId) => {
    const invite = await Invite.findById(inviteId);
    if(invite) {
        return invite;
    } else {
        generateError(inviteErrors.notExists, 404);
    }
};

inviteReducer.updateById = async (invite) => {
    const result = await Invite
        .findByIdAndUpdate(invite._id, invite, {
            new: true
        });
    if (result) {
        return result;
    } else {
        generateError(inviteErrors.notExists, 404);
    }
};

inviteReducer.deleteById = async (inviteId) => {
    return await Invite.findByIdAndRemove(inviteId);
};

module.exports = inviteReducer;