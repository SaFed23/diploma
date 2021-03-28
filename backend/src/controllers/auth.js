const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const { SALT } = require('../../config');

const authController = {};

authController.login = async (ctx, next) => {
  await passport.authenticate('local', function (err, user) {
    if (user == false) {
      ctx.body = "Login failed";
    } else {
      const payload = {
        id: user.id,
      };
      const token = jwt.sign(payload, SALT);
      
      ctx.body = {userId: user.id, token: token};
      ctx.status = 201;
    }
  })(ctx, next); 
}

module.exports = authController;