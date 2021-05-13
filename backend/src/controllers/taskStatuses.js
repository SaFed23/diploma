const taskStatusReducer = require("../reducers/taskStatus");

const taskStatusController = {};

taskStatusController.create = async (ctx) => {
    ctx.body = await taskStatusReducer.create(ctx.request.body);
    ctx.status = 201;
};

taskStatusController.getAll = async (ctx) => {
    ctx.body = await taskStatusReducer.getAll();
    ctx.status = 200;
};

taskStatusController.getById = async (ctx) => {
    const { taskStatusId } = ctx.params;
    ctx.body = await taskStatusReducer.getById(taskStatusId);
    ctx.status = 200;
};

taskStatusController.updateById = async (ctx) => {
    ctx.body = await taskStatusReducer.updateById(ctx.request.body);
    ctx.status = 201;
};

taskStatusController.deleteById = async (ctx) => {
    const { taskStatusId, newStatus } = ctx.params;
    console.log(taskStatusId, newStatus);
    ctx.body = await taskStatusReducer.deleteById(taskStatusId, newStatus);
    ctx.status = 204;
};

module.exports = taskStatusController;