const generateError = require('../utils');
const Project = require("../db/projects");
const { projectErrors } = require('../errors');

const projects = {};

projects.create = async (project) => {
    return await Project.create(project);
};

projects.getAll = async () => {
    return await Project.find();
};

projects.getById = async (projectId) => {
    const project = await Project.findById(projectId);
    if (project) {
        return project;
    } else {
        generateError(projectErrors.notExists, 404);
    }
};

projects.updateById = async (project) => {
    const result = await Project
        .findByIdAndUpdate(project._id, project, {
            new: true
        });
    if (result) {
        return result;
    } else {
        generateError(projectErrors.notExists, 404);
    }
    return 
};

projects.deleteById = async (projectId) => {
    return await Project.findByIdAndDelete(projectId);
};

module.exports = projects;