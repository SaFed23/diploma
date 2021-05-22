const { DB_CONNECTION, DB_NAME, SALT } = require('../../config');
const mongoose = require('mongoose');
const crypto = require('crypto');
const Comment = require("../db/comments");
const Factor = require("../db/factors");
const Feature = require("../db/features");
const Invite = require("../db/invites");
const Location = require("../db/locations");
const Project = require("../db/projects");
const Report = require("../db/reports");
const Role = require("../db/roles");
const Task = require("../db/tasks");
const TaskStatus = require("../db/taskStatuses");
const User = require("../db/users");

mongoose.connect(`${DB_CONNECTION}/${DB_NAME}`)
  .catch(e => console.log(e));

(async () => {
  try {
    // Delete data from db
    await Comment.deleteMany();
    await Factor.deleteMany();
    await Feature.deleteMany();
    await Invite.deleteMany();
    await Location.deleteMany();
    await Project.deleteMany();
    await Report.deleteMany();
    await Role.deleteMany();
    await Task.deleteMany();
    await TaskStatus.deleteMany();
    await User.deleteMany();

    // Fill data
    const factor1 = await Factor.create({ title: "Standart" });
    const factor2 = await Factor.create({ title: "Day off" });
    const factor3 = await Factor.create({ title: "Illness" });

    const role1 = await Role.create({ title: "admin" });
    const role2 = await Role.create({ title: "user" });

    const taskStatuses1 = await TaskStatus.create({ title: "To do", color: "red" });
    const taskStatuses2 = await TaskStatus.create({ title: "In progress", color: "green" });
    const taskStatuses3 = await TaskStatus.create({ title: "Review", color: "yellow" });
    const taskStatuses4 = await TaskStatus.create({ title: "Done", color: "blue" });

    const location1 = await Location.create({ title: "Brest" });
    const location2 = await Location.create({ title: "Minsk" });
    const location3 = await Location.create({ title: "Moscow" });

    const salt = crypto.randomBytes(128).toString('base64');
    const user1 = await User.create({
      username: "admin",
      passwordHash: crypto.pbkdf2Sync('admin', salt, 1, 128, 'sha1'),
      email: "admin@tut.by",
      roleId: role1._id,
      locationId: location1._id,
      salt,
    });
    const user2 = await User.create({
      username: "user",
      passwordHash: crypto.pbkdf2Sync('user', salt, 1, 128, 'sha1'),
      email: "user@tut.by",
      roleId: role2._id,
      locationId: location2._id,
      salt,
    });
    const user3 = await User.create({
      username: "manager",
      passwordHash: crypto.pbkdf2Sync('manager', salt, 1, 128, 'sha1'),
      email: "manager@tut.by",
      roleId: role2._id,
      locationId: location3._id,
      salt,
    });

    const project1 = await Project.create({
      title: "Best game",
      description: "Best game for all users",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2021-07-02"),
      ownerId: user1._id,
      userIds: [user1._id, user2._id],
    });
    const project2 = await Project.create({
      title: "Camera",
      description: "This application can show you new functions of camera in your phone",
      startDate: new Date("2020-10-01"),
      endDate: new Date("2021-01-10"),
      ownerId: user3._id,
      userIds: [user3._id, user1._id],
    });

    const invite1 = await Invite.create({
      title: "Good morning",
      description: "Good mood",
      date: new Date("2020-11-01"),
      userId: user2._id,
      projectId: project2._id,
    });
    const invite2 = await Invite.create({
      title: "Good night",
      description: "!!!Good mood!!!",
      date: new Date(),
      userId: user3._id,
      projectId: project1._id,
    });

    const feature1 = await Feature.create({
      title: "Development",
      description: "Try to develop this app",
      projectId: project1._id
    });
    const feature2 = await Feature.create({
      title: "Testing",
      description: "Test app",
      projectId: project1._id
    });
    const feature3 = await Feature.create({
      title: "Optimisation",
      description: "Good speed - good result",
      projectId: project2._id
    });
    const feature4 = await Feature.create({
      title: "Testing",
      description: "Take some photo",
      projectId: project2._id
    });

    const task1 = await Task.create({
      title: "Create db",
      description: "We need db for project",
      taskStatusId: taskStatuses1._id,
      featureId: feature1._id,
    });
    const task2 = await Task.create({
      title: "Write logic",
      description: "Write elementary logic for person",
      taskStatusId: taskStatuses1._id,
      featureId: feature1._id,
    });
    const task3 = await Task.create({
      title: "Test db",
      taskStatusId: taskStatuses2._id,
      featureId: feature2._id,
    });
    const task4 = await Task.create({
      title: "Test logic",
      taskStatusId: taskStatuses2._id,
      featureId: feature2._id,
    });
    const task5 = await Task.create({
      title: "Delete not used code",
      description: "Project has many not used part of code",
      taskStatusId: taskStatuses3._id,
      featureId: feature3._id,
    });
    const task6 = await Task.create({
      title: "Shape on stream",
      taskStatusId: taskStatuses3._id,
      featureId: feature3._id,
    });
    const task7 = await Task.create({
      title: "Daily photo",
      description: "Take some daily photo",
      taskStatusId: taskStatuses4._id,
      featureId: feature4._id,
    });
    const task8 = await Task.create({
      title: "Nightly photo",
      description: "Take some nightly photo",
      taskStatusId: taskStatuses1._id,
      featureId: feature4._id,
    });

    const comment1 = await Comment.create({
      description: "Sooooooo... ",
      date: new Date("2021-01-15"),
      userId: user1._id,
      taskId: task1._id
    });
    const comment2 = await Comment.create({
      description: "Переделай",
      date: new Date("2021-02-20"),
      userId: user2._id,
      taskId: task3._id
    });
    const comment3 = await Comment.create({
      description: "А это что?",
      date: new Date("2020-10-15"),
      userId: user3._id,
      taskId: task5._id
    });
    const comment4 = await Comment.create({
      description: "Пойдет",
      date: new Date("2020-12-29"),
      userId: user1._id,
      taskId: task7._id
    });
    const comment5 = await Comment.create({
      description: "Пойдет",
      date: new Date("2020-12-30"),
      userId: user1._id,
      taskId: task7._id
    });

    const report1 = await Report.create({
      date: new Date("2020-12-11"),
      status: "PRIVATE",
      hours: 8,
      projectId: project1._id,
      taskId: task3._id,
      featureId: feature2._id,
      userId: user1._id,
      factorId: factor1._id,
      locationId: location1._id,
    });
    const report2 = await Report.create({
      date: new Date("2021-01-01"),
      status: "REGISTERED",
      hours: 0,
      userId: user3._id,
      taskId: task8._id,
      featureId: feature4._id,
      factorId: factor2._id,
      locationId: location3._id,
      projectId: project2._id,
    });
  } catch (e) {
    console.log(e);
  }

  mongoose.connection.close();
})();
