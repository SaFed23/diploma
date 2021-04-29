const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const passport = require('koa-passport');;
const router = require('./src/routes/router.js')
const { ui } = require("swagger2-koa");
const socketioJwt = require('socketio-jwt');
const cors = require('cors');
const socketIO = require('socket.io');

const apiSpec = require('./apiSpec');
const { DB_CONNECTION, DB_NAME, PORT, SALT } = require('./config.js');
const { LOCAL_STRATEGY, JWT_STRATEGY } = require('./utils/auth.js');
const authRouter = require('./src/routes/authRouter.js');
const onConnection = require('./src/sockets/connection.js');

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

// auth
app.use(authRouter.routes());

app.use(async (ctx, next) => {
  await passport.authenticate('jwt', async function (err, user) {
    if (user) {
      await next();
    } else {
      const error = new Error('No such user')
      error.status = 401;
      console.log(err);
      ctx.app.emit('error', error, ctx);
    }
  })(ctx, next);
});

app.use(router.routes());

app.on('error', (err, ctx) => {
  ctx.status = err.status || 500;
  ctx.body = err.message;
  console.log(ctx.body);
});

const server = app.listen(PORT);

const io = socketIO(server, {
  cors: {
    origin: '*'
  }
});

io.use(socketioJwt.authorize({
  secret: SALT,
  handshake: true
}));

io.on('connection', (socket) => onConnection(socket, io))