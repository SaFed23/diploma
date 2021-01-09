const generateError = require('../utils');
const Feature = require("../db/features");
const { featureErrors } = require('../errors');

const featureReducer = {};

featureReducer.create = async (feature) => {
    return await Feature.create(feature);
};

featureReducer.getAll = async () => {
    return await Feature.find();
};

featureReducer.getById = async (featureId) => {
    const feature = await Feature.findById(featureId);
    if(feature) {
        return feature;
    } else {
        generateError(featureErrors.notExists, 404);
    }
};

featureReducer.updateById = async (feature) => {
    const result = await Feature
        .findByIdAndUpdate(feature._id, feature, {
            new: true
        });
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