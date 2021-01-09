const roleReducer = require("../reducers/role");

const roleController = {};

roleController.create = async (ctx) => {
    ctx.body = await roleReducer.create(ctx.request.body);
    ctx.status = 201;
};

roleController.getAll = async (ctx) => {
    ctx.body = await roleReducer.getAll();
    ctx.status = 200;
};

roleController.getById = async (ctx) => {
    const { roleId } = ctx.params; 
    ctx.body = await roleReducer.getById(roleId);
    ctx.status = 200;
};

roleController.updateById = async (ctx) => {
    ctx.body = await roleReducer.updateById(ctx.request.body);
    ctx.status = 201;
};

roleController.deleteById = async (ctx) => {
    const { roleId } = ctx.params; 
    ctx.body = await roleReducer.deleteById(roleId);
    ctx.status = 204;
};

module.exports = roleController;