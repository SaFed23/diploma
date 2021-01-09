const generateError = require('../utils');
const Role = require("../db/roles");
const { roleErrors } = require('../errors');

const roleReducer = {};

roleReducer.create = async (role) => {
    return await Role.create(role);
};

roleReducer.getAll = async () => {
    return await Role.find();
};

roleReducer.getById = async (roleId) => {
    const role = await Role.findById(roleId);
    if(role) {
        return role;
    } else {
        generateError(roleErrors.notExists, 404);
    }
};

roleReducer.updateById = async (role) => {
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

roleReducer.deleteById = async (roleId) => {
    return await Role.findByIdAndRemove(roleId);
};

module.exports = roleReducer;