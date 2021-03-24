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
          //--payload - информация которую мы храним в токене и можем из него получать
          const payload = {
            id: user.id,
            displayName: user.displayName,
            email: user.email
          };
          const token = jwt.sign(payload, SALT); //здесь создается JWT
          
          ctx.body = {user: user.displayName, token: 'JWT ' + token};
        }
      })(ctx, next);  
});

router.get('/custom', async(ctx, next) => {
  
    await passport.authenticate('jwt', function (err, user) {
      if (user) {
        ctx.body = "hello " + user.displayName;
      } else {
        ctx.body = "No such user";
        console.log("err", err)
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