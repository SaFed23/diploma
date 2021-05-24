const Project = require('../projects');
const Task = require('../tasks');
const Feature = require('../features');
const User = require('../users');
const Factor = require('../factors');
const Location = require('../locations');
const { getDate } = require('../../../utils/helper');

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
};

statics.getByFilter = async function (filter) {
  const filterObj = {};

  if (filter.month) {
    const date = new Date(filter.month);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    filterObj.date = { $gte: getDate(firstDay), $lte: getDate(lastDay) }
  }
  if (filter.userId) {
    filterObj.userId = filter.userId;
  }

  return await this.find(filterObj);
};

statics.getByAdminFilter = async function (filter) {
  const obj = {
    date: { $gte: new Date(filter.start), $lte: new Date(filter.end) },
  };

  if (filter.users?.length) {
    obj.userId = { $in: filter.users };
  }

  const result = await this.aggregate([
    {
      $match: obj,
    },
    {
      $group: {
        _id: { date: '$date', user: '$userId', },
        hours: { '$sum': '$hours', },
      },
    },
    {
      $sort: { '_id.date': 1, },
    },
  ]);

  const dates = result.reduce((acc, { _id }) => {
    const date = getDate(_id.date);
    if (!acc.includes(date)) {
      acc.push(date);
    }
    return acc;
  }, []);

  const users = result.reduce((acc, { _id, hours }) => {
    const { user, date } = _id;
    if (!acc[user]) {
      acc[user] = {};
    }
    acc[user][getDate(date)] = hours;

    return acc;
  }, {});

  return { dates, users };
};

module.exports = { methods, statics };