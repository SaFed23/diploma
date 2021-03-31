const User = require('../users');
const Project = require('../projects');

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
  const user = await User.findById(obj.userId);
  const project = await Project.findById(obj.projectId);
  obj.user = await user.getInfo();
  obj.project = await project.getInfo();
  delete obj._id;
  delete obj.userId;
  delete obj.projectId;

  return obj;
}

module.exports = { methods, statics };