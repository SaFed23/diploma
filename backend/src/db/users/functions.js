const crypto = require('crypto');

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

module.exports = {methods, statics};