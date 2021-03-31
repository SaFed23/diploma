const generateError = require('../utils');
const Invite = require("../db/invites");
const { inviteErrors } = require('../errors');
const { getInfoForArray } = require('../../utils/helper');

const inviteReducer = {};

inviteReducer.create = async (invite) => {
    const newInvite = await Invite.create(invite);
    return newInvite.getInfo();
};

inviteReducer.getAll = async () => {
    return getInfoForArray(await Invite.find());
};

inviteReducer.getById = async (inviteId) => {
    const invite = await Invite.findById(inviteId);
    if (invite) {
        return invite.getInfo();
    } else {
        generateError(inviteErrors.notExists, 404);
    }
};

inviteReducer.updateById = async (invite) => {
    const result = await Invite
        .findByIdAndUpdate(invite.id, invite, {
            new: true
        })
        .getInfo();
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