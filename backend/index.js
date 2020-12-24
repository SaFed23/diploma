const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const router = require('./src/routes/router.js')
const { ui } = require("swagger2-koa");

const apiSpec = require('./apiSpec');

const app = new Koa();
app.use(bodyParser());

app.use(ui(apiSpec, "/swagger"));

/**
* Connect to the database
*/
mongoose.connect('mongodb://localhost:27017');

//Errors generation

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
})

// logger

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(router.routes());

app.on('error', (err, ctx) => {
    console.log(ctx.body);
});

app.listen(2000);