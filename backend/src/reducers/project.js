const generateError = require('../utils');
const Project = require("../db/projects");
const { projectErrors } = require('../errors');

const projectsReducer = {};

projectsReducer.create = async (project) => {
    return await Project.create(project);
};

projectsReducer.getAll = async () => {
    return await Project.find();
};

projectsReducer.getById = async (projectId) => {
    const project = await Project.findById(projectId);
    if (project) {
        return project;
    } else {
        generateError(projectErrors.notExists, 404);
    }
};

projectsReducer.updateById = async (project) => {
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

projectsReducer.deleteById = async (projectId) => {
    return await Project.findByIdAndDelete(projectId);
};

module.exports = projectsReducer;