const projectReducer = require("../reducers/project");

const projectController = {};

projectController.create = async (ctx) => {
    ctx.body = await projectReducer.create(ctx.request.body);
    ctx.status = 201;
};

projectController.getAll = async (ctx) => {
    ctx.body = await projectReducer.getAll();
    ctx.status = 200;
};

projectController.getById = async (ctx) => {
    const { projectId } = ctx.params;
    ctx.body = await projectReducer.getById(projectId);
    ctx.status = 200;
};

projectController.getUserProjects = async (ctx) => {
    const { userId } = ctx.params;
    ctx.body = await projectReducer.getUserProjects(userId);
    ctx.status = 200;
}

projectController.updateById = async (ctx) => {
    ctx.body = await projectReducer.updateById(ctx.request.body);
    ctx.status = 201;
};

projectController.deleteById = async (ctx) => {
    const { projectId } = ctx.params;
    ctx.body = await projectReducer.deleteById(projectId);
    ctx.status = 204;
};

module.exports = projectController;