const Feature = require('../features');
const TaskStatus = require('../taskStatuses');

const methods = {};
const statics = {};

methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;

  return obj;
};

methods.getInfo = async function () {
  const obj = this.toObject();
  obj.id = obj._id;
  const feature = await Feature.findById(obj.featureId);
  const taskStatus = obj.taskStatusId ? await TaskStatus.findById(obj.taskStatusId) : undefined;
  obj.feature = await feature.getInfo();
  obj.taskStatus = taskStatus && await taskStatus?.getInfo();
  delete obj._id;
  delete obj.featureId;
  delete obj.taskStatusId;

  return obj;
}


module.exports = { methods, statics };