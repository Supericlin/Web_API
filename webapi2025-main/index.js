"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = require("koa");
var koa_router_1 = require("koa-router");
var koa_logger_1 = require("koa-logger");
var koa_json_1 = require("koa-json");
var articles_1 = require("./routers/articles");
var app = new koa_1.default();
var router = new koa_router_1.default();
/***const welcomeAPI = async (ctx: RouterContext, next: any) => {
    ctx.body = {
        message: "Welcome to the blog API!"
    };
    await next();
}***/
//router.get('/api/v1', welcomeAPI);
app.use((0, koa_json_1.default)());
app.use((0, koa_logger_1.default)());
//app.use(bodyParser());
//app.use(router.routes()).use(router.allowedMethods());
app.use(articles_1.router.routes());
app.listen(10888, function () {
    console.log('Blog API Started');
});
