const mongoose = require("mongoose");
const { v4 } = require("uuid");
const { methods, statics } = require("./functions");

const reportSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4
    },
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
    taskId: String,
    featureId: String,
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

reportSchema.methods = { ...methods };
reportSchema.statics = { ...statics };

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;