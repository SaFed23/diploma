const generateError = require('../utils');
const Feature = require("../db/features");
const { featureErrors, projectErrors } = require('../errors');
const { getInfoForArray } = require('../../utils/helper');

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
        })
        .getInfo();
    if (result) {
        return result;
    } else {
        generateError(featureErrors.notExists, 404);
    }
};

featureReducer.deleteById = async (featureId) => {
    return await Feature.findByIdAndRemove(featureId);
};

module.exports = featureReducer;