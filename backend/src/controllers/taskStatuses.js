const taskStatusesReducer = require("../reducers/taskStatuses");

const taskStatusesController = {};

taskStatusesController.create = async (ctx) => {
    ctx.body = await taskStatusesReducer.create(ctx.request.body);
    ctx.status = 201;
};

taskStatusesController.getAll = async (ctx) => {
    ctx.body = await taskStatusesReducer.getAll();
    ctx.status = 200;
};

taskStatusesController.getById = async (ctx) => {
    const { taskStatusesId } = ctx.params; 
    ctx.body = await taskStatusesReducer.getById(taskStatusesId);
    ctx.status = 200;
};

taskStatusesController.updateById = async (ctx) => {
    ctx.body = await taskStatusesReducer.updateById(ctx.request.body);
    ctx.status = 201;
};

taskStatusesController.deleteById = async (ctx) => {
    const { taskStatusesId } = ctx.params; 
    ctx.body = await taskStatusesReducer.deleteById(taskStatusesId);
    ctx.status = 204;
};

module.exports = taskStatusesController;