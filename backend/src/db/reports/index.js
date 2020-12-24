const mongoose = require("mongoose");
const {methods, statics} = require("./functions");

const reportSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,  
    },
    hours: {
        type: Number,
        required: true,
    },
    comment: String,
    projectId: {
        type: String,
        required: true,
    },
    taskId: {
        type: String,
        required: true,
    },
    featureId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    factorId: {
        type: String,
        required: true,
    },
    locationId: {
        type: String,
        required: true,
    },
}, {
    versionKey: false
});

reportSchema.methods = {...methods};
reportSchema.statics = {...statics};

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;