const User = require("../db/users");
const { generateError }  = require('../utils');
const { userErrors } = require("../errors");

const user = {};

user.create = async (user) => {
    return await User.create(user);
};

user.getAll = async () => {
    return await User.find();
};

user.getById = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        return user;
    } else {
        generateError(userErrors.notExists, 404)
    }
};

user.updateById = async (user) => {
    const result = await User.findById(departmentId);
    if(result) {
        return result
    } else {
        generateError(userErrors.notExists, 404);
    }
};

user.deleteById = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

user.changeManagerRoleById = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        return await user.changeManagerRole();
    } else {
        generateError(userErrors.notExists, 404)
    }
};

module.exports = user;