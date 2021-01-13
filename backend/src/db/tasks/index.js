const mongoose = require("mongoose");
const {methods, statics} = require("./functions");

const taskSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    statusTaskId: {
        type: String,
        required: true,
    },
    featureId: {
        type: String,
        required: true,
    },
}, {
    versionKey: false
});

taskSchema.methods = {...methods};
taskSchema.statics = {...statics};

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;