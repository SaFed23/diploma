const reportReducer = require("../reducers/report");

const reportController = {};

reportController.create = async (ctx) => {
    ctx.body = await reportReducer.create(ctx.request.body);
    ctx.status = 201;
};

reportController.getAll = async (ctx) => {
    ctx.body = await reportReducer.getAll();
    ctx.status = 200;
};

reportController.getById = async (ctx) => {
    const { reportId } = ctx.params;
    ctx.body = await reportReducer.getById(reportId);
    ctx.status = 200;
};

reportController.getByFilter = async (ctx) => {
    ctx.body = await reportReducer.getByFilter(ctx.request.query);
    ctx.status = 200;
}

reportController.updateById = async (ctx) => {
    ctx.body = await reportReducer.updateById(ctx.request.body);
    ctx.status = 201;
};

reportController.deleteById = async (ctx) => {
    const { reportId } = ctx.params;
    ctx.body = await reportReducer.deleteById(reportId);
    ctx.status = 204;
};

module.exports = reportController;