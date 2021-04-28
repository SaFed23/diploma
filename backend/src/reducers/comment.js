const generateError = require('../utils');
const Comment = require("../db/comments");
const { commentErrors, taskErrors } = require('../errors');
const { getInfoForArray } = require('../../utils/helper');

const commentReducer = {};

commentReducer.create = async (comment) => {
    const newComment = await Comment.create(comment);
    return newComment.getInfo();
};

commentReducer.getAll = async () => {
    return getInfoForArray(await Comment.find());
};

commentReducer.getById = async (commentId) => {
    const comment = await Comment.findById(commentId);
    if (comment) {
        return comment.getInfo();
    } else {
        generateError(commentErrors.notExists, 404);
    }
};

commentReducer.getByTaskId = async (taskId) => {
    const result = await Comment.getByTaskId(taskId);
    if (result) {
        return getInfoForArray(result);
    } else {
        generateError(taskErrors.notExists, 404);
    }
}

commentReducer.updateById = async (comment) => {
    const result = await Comment
        .findByIdAndUpdate(comment.id, comment, {
            new: true
        })
        .getInfo();
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