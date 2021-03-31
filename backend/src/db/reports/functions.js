const Project = require('../projects');
const Task = require('../tasks');
const Feature = require('../features');
const User = require('../users');
const Factor = require('../factors');
const Location = require('../locations');

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
  const project = await Project.findById(obj.projectId);
  const user = await User.findById(obj.userId);
  const location = await Location.findById(obj.locationId);
  const factor = await Factor.findById(obj.factorId);
  const task = obj.taskId ? await Task.findById(obj.taskId) : undefined;
  const feature = obj.featureId ? await Feature.findById(obj.featureId) : undefined;
  obj.project = await project.getInfo();
  obj.user = await user.getInfo();
  obj.location = await location.getInfo();
  obj.factor = await factor.getInfo();
  obj.task = task && await task?.getInfo();
  obj.feature = feature && await feature?.getInfo();
  delete obj._id;
  delete obj.featureId;
  delete obj.taskId;
  delete obj.projectId;
  delete obj.userId;
  delete obj.factorId;
  delete obj.locationId;

  return obj;
}

module.exports = { methods, statics };