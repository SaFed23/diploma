const generateError = require('../utils');
const Factor = require("../db/factors");
const { factorErrors } = require('../errors');

const factor = {};

factor.create = async (factor) => {
    return await Factor.create(factor);
};

factor.getAll = async () => {
    return await Factor.find();
};

factor.getById = async (factorId) => {
    const factor = await Factor.findById(factorId);
    if(factor) {
        return factor;
    } else {
        generateError(factorErrors.notExists, 404);
    }
};

factor.updateById = async (factor) => {
    const result = await Factor
        .findByIdAndUpdate(factor._id, factor, {
            new: true
        });
    if (result) {
        return result;
    } else {
        generateError(factorErrors.notExists, 404);
    }
};

factor.deleteById = async (factorId) => {
    return await Factor.findByIdAndRemove(factorId);
};

module.exports = factor;