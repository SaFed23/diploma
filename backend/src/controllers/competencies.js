const competenceReducer = require("../reducers/competence");

const competenceController = {};

competenceController.create = async (ctx) => {
    ctx.body = await competenceReducer.create(ctx.request.body);
    ctx.status = 201;
};

competenceController.getAll = async (ctx) => {
    ctx.body = await competenceReducer.getAll();
    ctx.status = 200;
};

competenceController.getById = async (ctx) => {
    const { competenceId } = ctx.params; 
    ctx.body = await competenceReducer.getById(competenceId);
    ctx.status = 200;
};

competenceController.updateById = async (ctx) => {
    ctx.body = await competenceReducer.updateById(ctx.request.body);
    ctx.status = 201;
};

competenceController.deleteById = async (ctx) => {
    const { competenceId } = ctx.params; 
    ctx.body = await competenceReducer.deleteById(competenceId);
    ctx.status = 204;
};

module.exports = competenceController;