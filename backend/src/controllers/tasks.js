const taskReducer = require("../reducers/task");

const taskController = {};

taskController.create = async (ctx) => {
    ctx.body = await taskReducer.create(ctx.request.body);
    ctx.status = 201;
};

taskController.getAll = async (ctx) => {
    ctx.body = await taskReducer.getAll();
    ctx.status = 200;
};

taskController.getById = async (ctx) => {
    const { taskId } = ctx.params; 
    ctx.body = await taskReducer.getById(taskId);
    ctx.status = 200;
};

taskController.updateById = async (ctx) => {
    ctx.body = await taskReducer.updateById(ctx.request.body);
    ctx.status = 201;
};

taskController.deleteById = async (ctx) => {
    const { taskId } = ctx.params; 
    ctx.body = await taskReducer.deleteById(taskId);
    ctx.status = 204;
};

module.exports = taskController;