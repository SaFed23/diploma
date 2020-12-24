const generateError = require('../utils');
const Department = require("../db/departments");
const { departmentErrors } = require('../errors');

const department = {};

department.create = async (department) => {
    return await Department.create(department);
};

department.getAll = async () => {
    return await Department.find();
};

department.getById = async (departmentId) => {
    const department = await Department.findById(departmentId);
    if(department) {
        return department;
    } else {
        generateError(departmentErrors.notExists, 404);
    }
};

department.updateById = async (department) => {
    const result = await Department
        .findByIdAndUpdate(department._id, department, {
            new: true
        });
    if (result) {
        return result;
    } else {
        generateError(departmentErrors.notExists, 404);
    }
};

department.deleteById = async (departmentId) => {
    return await Department.findByIdAndRemove(departmentId);
};

module.exports = department;