const generateError = require('../utils');
const Location = require("../db/locations ");
const { locationErrors } = require('../errors');

const location = {};

location.create = async (location) => {
    return await Location.create(location);
};

location.getAll = async () => {
    return await Location.find();
};

location.getById = async (locationId) => {
    const location = await Location.findById(locationId);
    if(location) {
        return location;
    } else {
        generateError(locationErrors.notExists, 404);
    }
};

location.updateById = async (location) => {
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

location.deleteById = async (locationId) => {
    return await Location.findByIdAndRemove(locationId);
};

module.exports = location;