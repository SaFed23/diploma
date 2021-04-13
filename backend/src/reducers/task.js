const generateError = require('../utils');
const Task = require("../db/tasks");
const { taskErrors, featureErrors } = require('../errors');
const { getInfoForArray } = require('../../utils/helper');

const taskReducer = {};

taskReducer.create = async (task) => {
    const newTask = await Task.create(task);
    return newTask.getInfo();
};

taskReducer.getAll = async () => {
    return getInfoForArray(await Task.find());
};

taskReducer.getById = async (taskId) => {
    const task = await Task.findById(taskId);
    if (task) {
        return task.getInfo();
    } else {
        generateError(taskErrors.notExists, 404);
    }
};

taskReducer.getByFeatureId = async (featureId) => {
    const tasks = await Task.getByFeatureId(featureId);
    if (tasks) {
        return tasks;
    } else {
        generateError(featureErrors.notExists, 404);
    }
};

taskReducer.updateById = async (task) => {
    const result = await Task
        .findByIdAndUpdate(task.id, task, {
            new: true
        });
    if (result) {
        return result.getInfo();
    } else {
        generateError(taskErrors.notExists, 404);
    }
};

taskReducer.deleteById = async (taskId) => {
    return await Task.findByIdAndRemove(taskId);
};

module.exports = taskReducer;