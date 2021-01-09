const locationReducer = require("../reducers/location");

const locationController = {};

locationController.create = async (ctx) => {
    ctx.body = await locationReducer.create(ctx.request.body);
    ctx.status = 201;
};

locationController.getAll = async (ctx) => {
    ctx.body = await locationReducer.getAll();
    ctx.status = 200;
};

locationController.getById = async (ctx) => {
    const { locationId } = ctx.params; 
    ctx.body = await locationReducer.getById(locationId);
    ctx.status = 200;
};

locationController.updateById = async (ctx) => {
    ctx.body = await locationReducer.updateById(ctx.request.body);
    ctx.status = 201;
};

locationController.deleteById = async (ctx) => {
    const { locationId } = ctx.params; 
    ctx.body = await locationReducer.deleteById(locationId);
    ctx.status = 204;
};

module.exports = locationController;