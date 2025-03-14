import Koa from "koa";
//import Router, {RouterContext} from "koa-router";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import serve from 'koa-static';
import bodyParser from "koa-bodyparser";
import {router as articles} from "./routers/articles";
import {router as special} from "./routers/special";

const app: Koa = new Koa();
const router: Router = new Router();

app.use(serve('./docs'));
app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(articles.routes());
app.use(special.routes());

app.listen(10888, ()=>{
    console.log('Blog API Started');
})