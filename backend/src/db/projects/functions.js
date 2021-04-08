const User = require('../users');

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
  const owner = await User.findById(obj.ownerId);
  obj.owner = await owner.getInfo();
  obj.users = [];
  for (const id of obj.userIds) {
    const user = await User.findById(id);
    obj.users.push(await user.getInfo());
  }
  delete obj._id;
  delete obj.ownerId;
  delete obj.userIds;

  return obj;
};

statics.findUserProjects = async function (userId) {
  const user = await User.findById(userId);
  if (user) {
    const projects = await this.find();
    return projects.filter(project => project.userIds.includes(userId));
  }

  return null;
}

module.exports = { methods, statics };