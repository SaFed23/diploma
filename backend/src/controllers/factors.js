const factorReducer = require("../reducers/factors");

const factorController = {};

factorController.create = async (ctx) => {
    ctx.body = await factorReducer.create(ctx.request.body);
    ctx.status = 201;
};

factorController.getAll = async (ctx) => {
    ctx.body = await factorReducer.getAll();
    ctx.status = 200;
};

factorController.getById = async (ctx) => {
    const { factorId } = ctx.params; 
    ctx.body = await factorReducer.getById(factorId);
    ctx.status = 200;
};

factorController.updateById = async (ctx) => {
    ctx.body = await factorReducer.updateById(ctx.request.body);
    ctx.status = 201;
};

factorController.deleteById = async (ctx) => {
    const { factorId } = ctx.params; 
    ctx.body = await factorReducer.deleteById(factorId);
    ctx.status = 204;
};

module.exports = factorController;