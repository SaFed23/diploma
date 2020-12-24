const generateError = require('../utils');
const Competence = require("../db/competencies");
const { competenceErrors } = require('../errors');

const competence = {};

competence.create = async (department) => {
    return await Competence.create(department);
};

competence.getAll = async () => {
    return await Competence.find();
};

competence.getById = async (competenceId) => {
    const competence = await Competence.findById(competenceId);
    if(competence) {
        return competence;
    } else {
        generateError(competenceErrors.notExists, 404);
    }
};

competence.updateById = async (competence) => {
    const result = await Competence
        .findByIdAndUpdate(competence._id, competence, {
            new: true
        });
    if (result) {
        return result;
    } else {
        generateError(competenceErrors.notExists, 404);
    }
};

competence.deleteById = async (competenceId) => {
    return await Competence.findByIdAndRemove(competenceId);
};

module.exports = competence;