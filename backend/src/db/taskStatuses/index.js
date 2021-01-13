const mongoose = require("mongoose");
const {methods, statics} = require("./functions");

const taskStatusSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4
    },
    title: {
        type: String,
        required: true,
    },
    color: String,
}, {
    versionKey: false
});

taskStatusSchema.methods = {...methods};
taskStatusSchema.statics = {...statics};

const TaskStatus = mongoose.model("TaskStatus", taskStatusSchema);

module.exports = TaskStatus;