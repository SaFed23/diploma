const generateError = require('../utils');
const Report = require("../db/reports");
const { reportErrors } = require('../errors');

const reportReducer = {};

reportReducer.create = async (report) => {
    return await Report.create(report);
};

reportReducer.getAll = async () => {
    return await Report.find();
};

reportReducer.getById = async (reportId) => {
    const report = await Report.findById(reportId);
    if(report) {
        return report;
    } else {
        generateError(reportErrors.notExists, 404);
    }
};

reportReducer.updateById = async (report) => {
    const result = await Report
        .findByIdAndUpdate(report._id, report, {
            new: true
        });
    if (result) {
        return result;
    } else {
        generateError(reportErrors.notExists, 404);
    }
};

reportReducer.deleteById = async (reportId) => {
    return await Report.findByIdAndRemove(reportId);
};

module.exports = reportReducer;