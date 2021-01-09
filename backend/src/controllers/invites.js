const inviteReducer = require("../reducers/invite");

const inviteController = {};

inviteController.create = async (ctx) => {
    ctx.body = await inviteReducer.create(ctx.request.body);
    ctx.status = 201;
};

inviteController.getAll = async (ctx) => {
    ctx.body = await inviteReducer.getAll();
    ctx.status = 200;
};

inviteController.getById = async (ctx) => {
    const { inviteId } = ctx.params; 
    ctx.body = await inviteReducer.getById(inviteId);
    ctx.status = 200;
};

inviteController.updateById = async (ctx) => {
    ctx.body = await inviteReducer.updateById(ctx.request.body);
    ctx.status = 201;
};

inviteController.deleteById = async (ctx) => {
    const { inviteId } = ctx.params; 
    ctx.body = await inviteReducer.deleteById(inviteId);
    ctx.status = 204;
};

module.exports = inviteController;