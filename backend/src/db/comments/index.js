const mongoose = require("mongoose");
const { v4 } = require("uuid");
const { methods, statics } = require("./functions");

const commentSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: new Date(),
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

commentSchema.methods = { ...methods };
commentSchema.statics = { ...statics };

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;