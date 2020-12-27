const generateError = require('../utils');
const Comment = require("../db/comments");
const { commentErrors } = require('../errors');

const comment = {};

comment.create = async (comment) => {
    return await Comment.create(comment);
};

comment.getAll = async () => {
    return await Comment.find();
};

comment.getById = async (commentId) => {
    const comment = await Comment.findById(commentId);
    if(comment) {
        return comment;
    } else {
        generateError(commentErrors.notExists, 404);
    }
};

comment.updateById = async (comment) => {
    const result = await Comment
        .findByIdAndUpdate(comment._id, comment, {
            new: true
        });
    if (result) {
        return result;
    } else {
        generateError(commentErrors.notExists, 404);
    }
};

comment.deleteById = async (commentId) => {
    return await Comment.findByIdAndRemove(commentId);
};

module.exports = comment;