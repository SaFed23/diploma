const User = require("../db/users");
const { generateError }  = require('../utils');
const { userErrors } = require("../errors");

const userReducer = {};

userReducer.create = async (user) => {
    return await User.create(user);
};

userReducer.getAll = async () => {
    return await User.find();
};

userReducer.getById = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        return user;
    } else {
        generateError(userErrors.notExists, 404)
    }
};

userReducer.updateById = async (user) => {
    const result = await User.findById(departmentId);
    if(result) {
        return result
    } else {
        generateError(userErrors.notExists, 404);
    }
};

userReducer.deleteById = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

module.exports = userReducer;