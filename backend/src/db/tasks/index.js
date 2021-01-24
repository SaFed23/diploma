const mongoose = require("mongoose");
const { v4 } = require("uuid");
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
    taskStatusId: String,
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