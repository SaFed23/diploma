const User = require("../db/users");
const generateError = require('../utils');
const { userErrors } = require("../errors");
const { getInfoForArray } = require('../../utils/helper');

const userReducer = {};

userReducer.create = async (user) => {
    const newUser = await User.create(user);
    return newUser.getInfo();
};

userReducer.getAll = async () => {
    return getInfoForArray(await User.find());
};

userReducer.getById = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        return user.getInfo();
    } else {
        generateError(userErrors.notExists, 404);
    }
};

userReducer.changePassword = async (user) => {
    const newUser = await User.changePassword(user);
    if (newUser) {
        return newUser.getInfo();
    } else {
        generateError(userErrors.notExists, 404);
    }
};

userReducer.updateById = async (user) => {
    const result = await User
        .findByIdAndUpdate(user.id, user, {
            new: true
        });
    if (result) {
        return result.getInfo();
    } else {
        generateError(userErrors.notExists, 404);
    }
};

userReducer.deleteById = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

module.exports = userReducer;