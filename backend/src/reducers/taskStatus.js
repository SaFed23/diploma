const generateError = require('../utils');
const TaskStatus = require("../db/taskStatuses");
const { taskStatusErrors } = require('../errors');
const { getInfoForArray } = require('../../utils/helper');
const Task = require('../db/tasks');

const taskStatusReducer = {};

taskStatusReducer.create = async (taskStatus) => {
    return await TaskStatus.create(taskStatus);
};

taskStatusReducer.getAll = async () => {
    return await TaskStatus.find();
};

taskStatusReducer.getById = async (taskStatusId) => {
    const taskStatus = await TaskStatus.findById(taskStatusId);
    if (taskStatus) {
        return taskStatus;
    } else {
        generateError(taskStatusErrors.notExists, 404);
    }
};

taskStatusReducer.updateById = async (taskStatus) => {
    const result = await TaskStatus
        .findByIdAndUpdate(taskStatus.id, taskStatus, {
            new: true
        });
    if (result) {
        return result;
    } else {
        generateError(taskStatusErrors.notExists, 404);
    }
};

taskStatusReducer.deleteById = async (taskStatusId, newStatus) => {
    if (newStatus !== '0') {
        const tasks = await Task.find({ taskStatusId: taskStatusId });
        for (const task of tasks) {
            task.changeStatus(newStatus);
        }
        return await TaskStatus.findByIdAndRemove(taskStatusId);
    } else {
        return await TaskStatus.findByIdAndRemove(taskStatusId);
    }
};

module.exports = taskStatusReducer;