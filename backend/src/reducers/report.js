const generateError = require('../utils');
const Report = require("../db/reports");
const { reportErrors } = require('../errors');
const { getInfoForArray } = require('../../utils/helper');

const reportReducer = {};

reportReducer.create = async (report) => {
    const newReport = await Report.create(report);
    return newReport.getInfo();
};

reportReducer.getAll = async () => {
    return getInfoForArray(await Report.find());
};

reportReducer.getById = async (reportId) => {
    const report = await Report.findById(reportId);
    if (report) {
        return report.getInfo();
    } else {
        generateError(reportErrors.notExists, 404);
    }
};

reportReducer.updateById = async (report) => {
    const result = await Report
        .findByIdAndUpdate(report.id, report, {
            new: true
        })
        .getInfo();
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