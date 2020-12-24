const mongoose = require("mongoose");
const {methods, statics} = require("./functions");

const ptojectSchema = new mongoose.Schema({
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
    }
}, {
    versionKey: false
});

ptojectSchema.methods = {...methods};
ptojectSchema.statics = {...statics};

const Project = mongoose.model("Project", ptojectSchema);

module.exports = Project;