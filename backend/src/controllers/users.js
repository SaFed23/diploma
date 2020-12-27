const userReducer = require("../reducers/user");

const userController = {};

userController.create = async (ctx) => {
    ctx.body = await userReducer.create(ctx.request.body);
    ctx.status = 201;
};

userController.getAll = async (ctx) => {
    ctx.body = await userReducer.getAll();
    ctx.status = 200;
};

userController.getById = async (ctx) => {
    const { userId } = ctx.params; 
    ctx.body = await userReducer.getById(userId);
    ctx.status = 200;
};

userController.updateById = async (ctx) => {
    ctx.body = await userReducer.updateById(ctx.request.body);
    ctx.status = 201;
};

userController.deleteById = async (ctx) => {
    const { userId } = ctx.params; 
    ctx.body = await userReducer.deleteById(userId);
    ctx.status = 204;
};

module.exports = userController;