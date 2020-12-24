const departmentReducer = require("../reducers/department");

const departmentController = {};

departmentController.create = async (ctx) => {
    ctx.body = await departmentReducer.create(ctx.request.body);
    ctx.status = 201;
};

departmentController.getAll = async (ctx) => {
    ctx.body = await departmentReducer.getAll();
    ctx.status = 200;
};

departmentController.getById = async (ctx) => {
    const { departmentId } = ctx.params; 
    ctx.body = await departmentReducer.getById(departmentId);
    ctx.status = 200;
};

departmentController.updateById = async (ctx) => {
    ctx.body = await departmentReducer.updateById(ctx.request.body);
    ctx.status = 201;
};

departmentController.deleteById = async (ctx) => {
    const { departmentId } = ctx.params; 
    ctx.body = await departmentReducer.deleteById(departmentId);
    ctx.status = 204;
};

module.exports = departmentController;