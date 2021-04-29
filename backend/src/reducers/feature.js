const generateError = require('../utils');
const Feature = require("../db/features");
const { featureErrors, projectErrors } = require('../errors');
const { getInfoForArray } = require('../../utils/helper');
const Task = require('../db/tasks');
const Comment = require('../db/comments');

const featureReducer = {};

featureReducer.create = async (feature) => {
    const newFeature = await Feature.create(feature);
    return newFeature.getInfo();
};

featureReducer.getAll = async () => {
    return getInfoForArray(await Feature.find());
};

featureReducer.getById = async (featureId) => {
    const feature = await Feature.findById(featureId);
    if (feature) {
        return feature.getInfo();
    } else {
        generateError(featureErrors.notExists, 404);
    }
};

featureReducer.getByProjectId = async (projectId) => {
    const features = await Feature.getByProjectId(projectId);
    if (features) {
        return getInfoForArray(features);
    } else {
        generateError(projectErrors.notExists, 404);
    }
};

featureReducer.updateById = async (feature) => {
    const result = await Feature
        .findByIdAndUpdate(feature.id, feature, {
            new: true
        });
    if (result) {
        return result.getInfo();
    } else {
        generateError(featureErrors.notExists, 404);
    }
};

featureReducer.deleteById = async (featureId) => {
    const tasks = await Task.find({ featureId });
    for (const task of tasks) {
        await Comment.deleteMany({ taskId: task.id });
    }
    await Task.deleteMany({ featureId });
    return await Feature.findByIdAndRemove(featureId);
};

module.exports = featureReducer;