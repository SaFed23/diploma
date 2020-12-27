const generateError = require('../utils');
const TaskStatus = require("../db/taskStatuses");
const { taskStatusErrors } = require('../errors');

const taskStatus = {};

taskStatus.create = async (taskStatus) => {
    return await TaskStatus.create(taskStatus);
};

taskStatus.getAll = async () => {
    return await TaskStatus.find();
};

taskStatus.getById = async (taskStatusId) => {
    const taskStatus = await TaskStatus.findById(taskStatusId);
    if(taskStatus) {
        return taskStatus;
    } else {
        generateError(taskStatusErrors.notExists, 404);
    }
};

taskStatus.updateById = async (taskStatus) => {
    const result = await TaskStatus
        .findByIdAndUpdate(taskStatus._id, taskStatus, {
            new: true
        });
    if (result) {
        return result;
    } else {
        generateError(taskStatusErrors.notExists, 404);
    }
};

taskStatus.deleteById = async (taskStatusId) => {
    return await TaskStatus.findByIdAndRemove(taskStatusId);
};

module.exports = taskStatus;