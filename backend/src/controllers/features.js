const featureReducer = require("../reducers/feature");

const featureController = {};

featureController.create = async (ctx) => {
    ctx.body = await featureReducer.create(ctx.request.body);
    ctx.status = 201;
};

featureController.getAll = async (ctx) => {
    ctx.body = await featureReducer.getAll();
    ctx.status = 200;
};

featureController.getById = async (ctx) => {
    const { featureId } = ctx.params; 
    ctx.body = await featureReducer.getById(featureId);
    ctx.status = 200;
};

featureController.updateById = async (ctx) => {
    ctx.body = await featureReducer.updateById(ctx.request.body);
    ctx.status = 201;
};

featureController.deleteById = async (ctx) => {
    const { featureId } = ctx.params; 
    ctx.body = await featureReducer.deleteById(featureId);
    ctx.status = 204;
};

module.exports = featureController;