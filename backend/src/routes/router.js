const Router = require('koa-router');
const { router } = require('swagger2-koa');
const competenceController = require('../controllers/competencies');
const departmentController = require('../controllers/departments');
const projectController = require('../controllers/projects');
const userController = require('../controllers/users');

// ROUTES
const routerV3 = new Router();

//departments
routerV3.post("departments", "/departments", departmentController.create);
routerV3.get("departments", "/departments", departmentController.getAll);
routerV3.get("departments", "/departments/:departmentId", departmentController.getById);
routerV3.put("departments", "/departments", departmentController.updateById);
routerV3.delete("departments", "/departments/:departmentId", departmentController.deleteById);

//projects
routerV3.post("projects", "/projects", projectController.create);
routerV3.get("projects", "/projects", projectController.getAll);
routerV3.get("projects", "/projects/:projectId", projectController.getById);
routerV3.put("projects", "/projects", projectController.updateById);
routerV3.delete("projects", "/projects/:projectId", projectController.deleteById);

//competencies
routerV3.post("competencies", "/competencies", competenceController.create);
routerV3.get("competencies", "/competencies", competenceController.getAll);
routerV3.get("competencies", "/competencies/:competenceId", competenceController.getById);
routerV3.put("competencies", "/competencies", competenceController.updateById);
routerV3.delete("competencies", "/competencies/:competenceId", competenceController.deleteById);

//users
routerV3.post("users", "/users", userController.create);
routerV3.get("users", "/users", userController.getAll);
routerV3.get("users", "/users/:userId", userController.getById);
routerV3.put("user", "/users/changeManagerRole/:userId", userController.changeManagerRole);
routerV3.put("user", "/users/changeDepartment", userController.updateById);
routerV3.put("user", "/users/changeProjects", userController.updateById);
routerV3.delete("users", "/users/:userId", userController.deleteById);

module.exports = routerV3;