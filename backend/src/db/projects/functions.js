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
  obj.owner = owner ? await owner.getInfo() : null;
  obj.users = [];
  for (const id of obj.userIds) {
    const user = await User.findById(id);
    if (user) {
      obj.users.push(await user.getInfo());
    }
  }
  this.userIds = obj.users.map(user => user.id);
  await this.save();
  delete obj._id;
  delete obj.ownerId;
  delete obj.userIds;

  return obj;
};

methods.addUser = async function (user) {
  if (!this.userIds.includes(user.id)) {
    this.userIds.push(user.id);
  }
  return this.save();
};

statics.findUserProjects = async function (userId) {
  const user = await User.findById(userId);
  if (user) {
    const projects = await this.find();
    return projects.filter(project => project.userIds.includes(userId));
  }

  return null;
};

module.exports = { methods, statics };