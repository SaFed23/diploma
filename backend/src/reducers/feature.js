const generateError = require('../utils');
const Feature = require("../db/features");
const { featureErrors } = require('../errors');

const feature = {};

feature.create = async (feature) => {
    return await Feature.create(feature);
};

feature.getAll = async () => {
    return await Feature.find();
};

feature.getById = async (featureId) => {
    const feature = await Feature.findById(featureId);
    if(feature) {
        return feature;
    } else {
        generateError(featureErrors.notExists, 404);
    }
};

feature.updateById = async (feature) => {
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

feature.deleteById = async (featureId) => {
    return await Feature.findByIdAndRemove(featureId);
};

module.exports = feature;