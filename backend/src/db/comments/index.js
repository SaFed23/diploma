const mongoose = require("mongoose");
const {methods, statics} = require("./functions");

const commentSchema = new mongoose.Schema({
    description: String,
    data: {
        type: Date,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    taskId: {
        type: String,
        required: true,
    }
}, {
    versionKey: false
});

commentSchema.methods = {...methods};
commentSchema.statics = {...statics};

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;