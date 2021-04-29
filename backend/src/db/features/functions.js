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
  const project = await Project.findById(obj.projectId);
  obj.project = await project.getInfo();
  delete obj._id;
  delete obj.projectId;

  return obj;
}

statics.getByProjectId = async function (projectId) {
  const project = await Project.findById(projectId);
  if (project) {
    const features = await this.find({ projectId });
    return features;
  }

  return null;
};

module.exports = { methods, statics };