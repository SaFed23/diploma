const User = require('../users');
const Task = require('../tasks');

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
  const task = await Task.findById(obj.taskId);
  const user = await User.findById(obj.userId);
  obj.task = await task.getInfo()
  obj.user = await user.getInfo();
  delete obj._id;
  delete obj.taskId;
  delete obj.userId;

  return obj;
}

module.exports = { methods, statics };