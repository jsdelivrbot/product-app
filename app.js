require('babel-register');
const Koa = require('koa');
const app = new Koa();
const config = require('./webpack.config.js');
const middleware = require('koa-webpack');
const webpack = require('webpack');
const serve = require("koa-static");
const Router = require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const compiler = webpack(config);
function statFile(file) {
    return new Promise(function(resolve, reject) {
        fs.readFile(file, 'utf8', function(err, stat) {
            if (err) {
                reject(err);
            } else {
                resolve(stat);
            }
        });
    });
}

function writeFile(filePath, file) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(filePath, file, function(err, stat) {
            if (err) {
                reject(err);
            } else {
                resolve(stat);
            }
        });
    });
}
app.use(middleware({
    compiler: compiler
}));
// x-response-time
app.use(bodyParser());
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});
router
    .get('/users', async (ctx) => {
        let users = await statFile('./users.json');
        ctx.body = users;
    })
    .post('/users/create', async (ctx) => {
        const users = await statFile('./users.json');
        const list = JSON.parse(users);
        list.push(ctx.request.body);
        const writedFile = await writeFile('./users.json', JSON.stringify(list));
        ctx.body = ctx.request.body;

    });

app.use(router.routes())
   .use(router.allowedMethods());

app.use(serve("public"));

app.listen(3000);