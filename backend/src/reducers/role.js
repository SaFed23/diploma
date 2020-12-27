const generateError = require('../utils');
const Role = require("../db/roles");
const { roleErrors } = require('../errors');

const role = {};

role.create = async (role) => {
    return await Role.create(role);
};

role.getAll = async () => {
    return await Role.find();
};

role.getById = async (roleId) => {
    const role = await Role.findById(roleId);
    if(role) {
        return role;
    } else {
        generateError(roleErrors.notExists, 404);
    }
};

role.updateById = async (role) => {
    const result = await Role
        .findByIdAndUpdate(role._id, role, {
            new: true
        });
    if (result) {
        return result;
    } else {
        generateError(roleErrors.notExists, 404);
    }
};

role.deleteById = async (roleId) => {
    return await Role.findByIdAndRemove(roleId);
};

module.exports = role;