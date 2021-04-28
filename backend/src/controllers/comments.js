const commentReducer = require("../reducers/comment");

const commentController = {};

commentController.create = async (ctx) => {
    ctx.body = await commentReducer.create(ctx.request.body);
    ctx.status = 201;
};

commentController.getAll = async (ctx) => {
    ctx.body = await commentReducer.getAll();
    ctx.status = 200;
};

commentController.getById = async (ctx) => {
    const { commentId } = ctx.params;
    ctx.body = await commentReducer.getById(commentId);
    ctx.status = 200;
};

commentController.getByTaskId = async (ctx) => {
    const { taskId } = ctx.params;
    ctx.body = await commentReducer.getByTaskId(taskId);
    ctx.status = 200;
};

commentController.updateById = async (ctx) => {
    ctx.body = await commentReducer.updateById(ctx.request.body);
    ctx.status = 201;
};

commentController.deleteById = async (ctx) => {
    const { commentId } = ctx.params;
    ctx.body = await commentReducer.deleteById(commentId);
    ctx.status = 204;
};

module.exports = commentController;