const Router = require('koa-router');
const authController = require('../controllers/auth');

const authRouter = new Router();

authRouter.post('/auth/login' , authController.login)

module.exports = authRouter;