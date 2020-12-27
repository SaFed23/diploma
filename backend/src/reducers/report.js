const generateError = require('../utils');
const Report = require("../db/reports");
const { reportErrors } = require('../errors');

const report = {};

report.create = async (report) => {
    return await Report.create(report);
};

report.getAll = async () => {
    return await Report.find();
};

report.getById = async (reportId) => {
    const report = await Report.findById(reportId);
    if(report) {
        return report;
    } else {
        generateError(reportErrors.notExists, 404);
    }
};

report.updateById = async (report) => {
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

report.deleteById = async (reportId) => {
    return await Report.findByIdAndRemove(reportId);
};

module.exports = report;