const generateError = require('../utils');
const Factor = require("../db/factors");
const { factorErrors } = require('../errors');

const factorReducer = {};

factorReducer.create = async (factor) => {
    return await Factor.create(factor);
};

factorReducer.getAll = async () => {
    return await Factor.find();
};

factorReducer.getById = async (factorId) => {
    const factor = await Factor.findById(factorId);
    if (factor) {
        return factor;
    } else {
        generateError(factorErrors.notExists, 404);
    }
};

factorReducer.updateById = async (factor) => {
    const result = await Factor
        .findByIdAndUpdate(factor.id, factor, {
            new: true
        });
    if (result) {
        return result;
    } else {
        generateError(factorErrors.notExists, 404);
    }
};

factorReducer.deleteById = async (factorId) => {
    return await Factor.findByIdAndRemove(factorId);
};

module.exports = factorReducer;