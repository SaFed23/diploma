const mongoose = require("mongoose");
const { v4 } = require("uuid");
const {methods, statics} = require("./functions");

const ptojectSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    userIds: {
        type: Array,
        required: true,
    },
}, {
    versionKey: false
});

ptojectSchema.methods = {...methods};
ptojectSchema.statics = {...statics};

const Project = mongoose.model("Project", ptojectSchema);

module.exports = Project;