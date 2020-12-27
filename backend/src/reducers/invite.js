const generateError = require('../utils');
const Invite = require("../db/invites");
const { inviteErrors } = require('../errors');

const invite = {};

invite.create = async (invite) => {
    return await Invite.create(invite);
};

invite.getAll = async () => {
    return await Invite.find();
};

invite.getById = async (inviteId) => {
    const invite = await Invite.findById(inviteId);
    if(invite) {
        return invite;
    } else {
        generateError(inviteErrors.notExists, 404);
    }
};

invite.updateById = async (invite) => {
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

invite.deleteById = async (inviteId) => {
    return await Invite.findByIdAndRemove(inviteId);
};

module.exports = invite;