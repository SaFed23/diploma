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
}

module.exports = { methods, statics };