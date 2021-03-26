const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const router = require('./src/routes/router.js')
const { ui } = require("swagger2-koa");

const apiSpec = require('./apiSpec');
const { DB_CONNECTION, DB_NAME, PORT, SALT } = require('./config.js');
const { LOCAL_STRATEGY, JWT_STRATEGY } = require('./utils/auth.js');

const app = new Koa();
app.use(bodyParser());

app.use(passport.initialize());

passport.use(LOCAL_STRATEGY);
passport.use(JWT_STRATEGY);

app.use(ui(apiSpec, "/swagger"));

mongoose.connect(`${DB_CONNECTION}/${DB_NAME}`)
.catch(err => {
    app.emit('error', err, ctx);
});

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.app.emit('error', err, ctx);
    }
})

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

router.post('/login', async (ctx, next) => {
  await passport.authenticate('local', function (err, user) {
      if (user == false) {
        ctx.body = "Login failed";
      } else {
        const payload = {
          id: user.id,
        };
        const token = jwt.sign(payload, SALT);
        
        ctx.body = {user: user.username, token: token};
      }
    })(ctx, next);  
});

app.use(async(ctx, next) => {
    await passport.authenticate('jwt', async function (err, user) {
      if (user) {
        console.log("hello " + user.username);
        await next()
      } else {
        ctx.app.emit('No such user', err, ctx);
      }
    } )(ctx, next)  
  });

app.use(router.routes());

app.on('error', (err, ctx) => {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    console.log(ctx.body);
});

app.listen(PORT);