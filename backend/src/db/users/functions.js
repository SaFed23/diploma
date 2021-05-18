const crypto = require('crypto');
const Role = require('../roles');
const Location = require('../locations');

const methods = {};
const statics = {};

methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.passwordHash;
  delete obj.salt;

  return obj;
};

methods.checkPassword = function (password) {
  if (!password) {
    return false;
  }
  if (!this.passwordHash) {
    return false;
  }
  return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

methods.getInfo = async function () {
  const obj = this.toObject();
  obj.id = obj._id;
  const role = await Role.findById(obj.roleId);
  const location = obj.locationId ? await Location.findById(obj.locationId) : undefined;
  obj.role = await role.getInfo();
  obj.location = location && await location?.getInfo();
  delete obj._id;
  delete obj.passwordHash;
  delete obj.salt;
  delete obj.roleId;
  delete obj.locationId;

  return obj;
};

statics.changePassword = async function ({ id, oldPassword, password }) {
  const user = await this.findById(id);
  if (user.checkPassword(oldPassword)) {
    user.passwordHash = crypto.pbkdf2Sync(password, user.salt, 1, 128, 'sha1');
    return user.save();
  }
  return null;
};

statics.createUser = async function (user) {
  const newUser = { ...user };
  const salt = crypto.randomBytes(128).toString('base64');
  newUser.passwordHash = crypto.pbkdf2Sync(user.password, salt, 1, 128, 'sha1');
  newUser.salt = salt;
  delete newUser.password;
  return await this.create(newUser);
}

module.exports = { methods, statics };