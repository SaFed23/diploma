const Feature = require('../features');
const TaskStatus = require('../taskStatuses');
const User = require('../users');
const { getInfoForArray } = require('../../../utils/helper');

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
  obj.users = [];
  for (const id of obj.userIds) {
    const user = await User.findById(id);
    obj.users.push(await user.getInfo());
  }
  delete obj._id;
  delete obj.featureId;
  delete obj.taskStatusId;
  delete obj.userIds;

  return obj;
};

methods.changeStatus = async function (statusId) {
  this.taskStatusId = statusId;
  return this.save();
};

statics.getByFeatureId = async function (featureId) {
  const feature = await Feature.findById(featureId);
  if (feature) {
    const taskStatuses = await TaskStatus.find();
    // const tasks = await this.find({ featureId });
    const groupTask = [];
    for (const taskStatus of taskStatuses) {
      const obj = { ...taskStatus.toJSON() };
      obj.tasks = await getInfoForArray(await this.find({ taskStatusId: taskStatus.id, featureId }));
      groupTask.push(obj);
    }
    return groupTask;
  }

  return null;
};


module.exports = { methods, statics };