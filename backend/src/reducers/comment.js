const generateError = require('../utils');
const Comment = require("../db/comments");
const { commentErrors } = require('../errors');

const commentReducer = {};

commentReducer.create = async (comment) => {
    return await Comment.create(comment);
};

commentReducer.getAll = async () => {
    return await Comment.find();
};

commentReducer.getById = async (commentId) => {
    const comment = await Comment.findById(commentId);
    if(comment) {
        return comment;
    } else {
        generateError(commentErrors.notExists, 404);
    }
};

commentReducer.updateById = async (comment) => {
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

commentReducer.deleteById = async (commentId) => {
    return await Comment.findByIdAndRemove(commentId);
};

module.exports = commentReducer;