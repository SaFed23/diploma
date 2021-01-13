const generateError = require('../utils');
const Location = require("../db/locations");
const { locationErrors } = require('../errors');

const locationReducer = {};

locationReducer.create = async (location) => {
    return await Location.create(location);
};

locationReducer.getAll = async () => {
    return await Location.find();
};

locationReducer.getById = async (locationId) => {
    const location = await Location.findById(locationId);
    if(location) {
        return location;
    } else {
        generateError(locationErrors.notExists, 404);
    }
};

locationReducer.updateById = async (location) => {
    const result = await Location
        .findByIdAndUpdate(location._id, location, {
            new: true
        });
    if (result) {
        return result;
    } else {
        generateError(locationErrors.notExists, 404);
    }
};

locationReducer.deleteById = async (locationId) => {
    return await Location.findByIdAndRemove(locationId);
};

module.exports = locationReducer;