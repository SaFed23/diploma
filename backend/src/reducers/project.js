const generateError = require('../utils');
const Project = require("../db/projects");
const { projectErrors } = require('../errors');
const { getInfoForArray } = require('../../utils/helper');

const projectsReducer = {};

projectsReducer.create = async (project) => {
    const newProject = await Project.create(project);
    return newProject.getInfo();
};

projectsReducer.getAll = async () => {
    return getInfoForArray(await Project.find());
};

projectsReducer.getById = async (projectId) => {
    const project = await Project.findById(projectId);
    if (project) {
        return project.getInfo();
    } else {
        generateError(projectErrors.notExists, 404);
    }
};

projectsReducer.updateById = async (project) => {
    const result = await Project
        .findByIdAndUpdate(project.id, project, {
            new: true
        })
        .getInfo();
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