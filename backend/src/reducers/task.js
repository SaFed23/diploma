const generateError = require('../utils');
const Task = require("../db/tasks");
const { taskErrors } = require('../errors');

const taskReducer = {};

taskReducer.create = async (task) => {
    return await Task.create(task);
};

taskReducer.getAll = async () => {
    return await Task.find();
};

taskReducer.getById = async (taskId) => {
    const task = await Task.findById(taskId);
    if(task) {
        return task;
    } else {
        generateError(taskErrors.notExists, 404);
    }
};

taskReducer.updateById = async (task) => {
    const result = await Task
        .findByIdAndUpdate(task._id, task, {
            new: true
        });
    if (result) {
        return result;
    } else {
        generateError(taskErrors.notExists, 404);
    }
};

taskReducer.deleteById = async (taskId) => {
    return await Task.findByIdAndRemove(taskId);
};

module.exports = taskReducer;