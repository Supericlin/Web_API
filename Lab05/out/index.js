"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
//import Router, {RouterContext} from "koa-router";
const koa_router_1 = __importDefault(require("koa-router"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const articles_1 = require("./routers/articles");
const special_1 = require("./routers/special");
const app = new koa_1.default();
const router = new koa_router_1.default();
app.use((0, koa_json_1.default)());
app.use((0, koa_logger_1.default)());
app.use((0, koa_bodyparser_1.default)());
app.use(articles_1.router.routes());
app.use(special_1.router.routes());
app.listen(10888, () => {
    console.log('Blog API Started');
});
