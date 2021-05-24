const Router = require('koa-router');
const { ROUTES, NAMES } = require('../../config');
const commentController = require('../controllers/comments');
const factorController = require('../controllers/factors');
const featureController = require('../controllers/features');
const inviteController = require('../controllers/invites');
const locationController = require('../controllers/locations');
const projectController = require('../controllers/projects');
const reportController = require('../controllers/reports');
const roleController = require('../controllers/roles');
const taskController = require('../controllers/tasks');
const taskStatusController = require('../controllers/taskStatuses');
const userController = require('../controllers/users');

// ROUTES
const routerV3 = new Router();

// comments
routerV3.post(NAMES.comments, ROUTES.comments, commentController.create);
routerV3.get(NAMES.comments, ROUTES.comments, commentController.getAll);
routerV3.get(NAMES.comments, `${ROUTES.comments}/:commentId`, commentController.getById);
routerV3.get(NAMES.comments, `${ROUTES.comments}/task/:taskId`, commentController.getByTaskId);
routerV3.put(NAMES.comments, ROUTES.comments, commentController.updateById);
routerV3.delete(NAMES.comments, `${ROUTES.comments}/:commentId`, commentController.deleteById);

// factors
routerV3.post(NAMES.factors, ROUTES.factors, factorController.create);
routerV3.get(NAMES.factors, ROUTES.factors, factorController.getAll);
routerV3.get(NAMES.factors, `${ROUTES.factors}/:factorId`, factorController.getById);
routerV3.put(NAMES.factors, ROUTES.factors, factorController.updateById);
routerV3.delete(NAMES.factors, `${ROUTES.factors}/:factorId`, factorController.deleteById);

// features
routerV3.post(NAMES.features, ROUTES.features, featureController.create);
routerV3.get(NAMES.features, ROUTES.features, featureController.getAll);
routerV3.get(NAMES.features, `${ROUTES.features}/:featureId`, featureController.getById);
routerV3.get(NAMES.features, `${ROUTES.features}/project/:projectId`, featureController.getByProjectId);
routerV3.put(NAMES.features, ROUTES.features, featureController.updateById);
routerV3.delete(NAMES.features, `${ROUTES.features}/:featureId`, featureController.deleteById);

// invites
routerV3.post(NAMES.invites, ROUTES.invites, inviteController.create);
routerV3.get(NAMES.invites, ROUTES.invites, inviteController.getAll);
routerV3.get(NAMES.invites, `${ROUTES.invites}/:inviteId`, inviteController.getById);
routerV3.put(NAMES.invites, ROUTES.invites, inviteController.updateById);
routerV3.delete(NAMES.invites, `${ROUTES.invites}/:inviteId`, inviteController.deleteById);

// locations
routerV3.post(NAMES.locations, ROUTES.locations, locationController.create);
routerV3.get(NAMES.locations, ROUTES.locations, locationController.getAll);
routerV3.get(NAMES.locations, `${ROUTES.locations}/:locationId`, locationController.getById);
routerV3.put(NAMES.locations, ROUTES.locations, locationController.updateById);
routerV3.delete(NAMES.locations, `${ROUTES.locations}/:locationId`, locationController.deleteById);

// projects
routerV3.post(NAMES.projects, ROUTES.projects, projectController.create);
routerV3.get(NAMES.projects, ROUTES.projects, projectController.getAll);
routerV3.get(NAMES.projects, `${ROUTES.projects}/:projectId`, projectController.getById);
routerV3.get(NAMES.projects, `${ROUTES.projects}/user/:userId`, projectController.getUserProjects);
routerV3.put(NAMES.projects, ROUTES.projects, projectController.updateById);
routerV3.delete(NAMES.projects, `${ROUTES.projects}/:projectId`, projectController.deleteById);

// reports
routerV3.post(NAMES.reports, ROUTES.reports, reportController.create);
routerV3.get(NAMES.reports, ROUTES.reports, reportController.getAll);
routerV3.get(NAMES.reports, `${ROUTES.reports}/user/filter`, reportController.getUserReports);
routerV3.post(NAMES.reports, `${ROUTES.reports}/admin/filter`, reportController.getByAdminFilter);
routerV3.get(NAMES.reports, `${ROUTES.reports}/:reportId`, reportController.getById);
routerV3.put(NAMES.reports, ROUTES.reports, reportController.updateById);
routerV3.delete(NAMES.reports, `${ROUTES.reports}/:reportId`, reportController.deleteById);

// roles
routerV3.post(NAMES.roles, ROUTES.roles, roleController.create);
routerV3.get(NAMES.roles, ROUTES.roles, roleController.getAll);
routerV3.get(NAMES.roles, `${ROUTES.roles}/:roleId`, roleController.getById);
routerV3.put(NAMES.roles, ROUTES.roles, roleController.updateById);
routerV3.delete(NAMES.roles, `${ROUTES.roles}/:roleId`, roleController.deleteById);

// tasks
routerV3.post(NAMES.tasks, ROUTES.tasks, taskController.create);
routerV3.get(NAMES.tasks, ROUTES.tasks, taskController.getAll);
routerV3.get(NAMES.tasks, `${ROUTES.tasks}/:taskId`, taskController.getById);
routerV3.get(NAMES.tasks, `${ROUTES.tasks}/feature/:featureId`, taskController.getByFeatureId)
routerV3.put(NAMES.tasks, ROUTES.tasks, taskController.updateById);
routerV3.delete(NAMES.tasks, `${ROUTES.tasks}/:taskId`, taskController.deleteById);

// taskStatuses
routerV3.post(NAMES.taskStatuses, ROUTES.taskStatuses, taskStatusController.create);
routerV3.get(NAMES.taskStatuses, ROUTES.taskStatuses, taskStatusController.getAll);
routerV3.get(NAMES.taskStatuses, `${ROUTES.taskStatuses}/:taskStatusId`, taskStatusController.getById);
routerV3.put(NAMES.taskStatuses, ROUTES.taskStatuses, taskStatusController.updateById);
routerV3.delete(NAMES.taskStatuses, `${ROUTES.taskStatuses}/:taskStatusId/:newStatus`, taskStatusController.deleteById);

// users
routerV3.post(NAMES.users, ROUTES.users, userController.create);
routerV3.get(NAMES.users, ROUTES.users, userController.getAll);
routerV3.get(NAMES.users, `${ROUTES.users}/:userId`, userController.getById);
routerV3.put(NAMES.users, `${ROUTES.users}/changePassword`, userController.changePassword);
routerV3.put(NAMES.users, ROUTES.users, userController.updateById);
routerV3.delete(NAMES.users, `${ROUTES.users}/:userId`, userController.deleteById);

module.exports = routerV3;