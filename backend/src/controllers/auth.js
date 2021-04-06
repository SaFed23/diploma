const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const { SALT } = require('../../config');

const authController = {};

authController.login = async (ctx, next) => {
  await passport.authenticate('local', async function (err, user) {
    if (user == false) {
      ctx.body = "Login failed";
    } else {
      const payload = {
        id: user.id,
      };
      const token = jwt.sign(payload, SALT);
      const userData = await user.getInfo();

      ctx.body = {
        user: {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          role: userData.role,
          location: userData.location,
        },
        token: token
      };
      ctx.status = 201;
    }
  })(ctx, next);
}

module.exports = authController;