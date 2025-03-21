import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";
import * as articlesmodel from '../models/articles';
import { basicAuth } from '../controllers/auth'
import { restrictUpdate, restrictDelete, restrictCreate } from '../controllers/permissions';

const router = new Router({prefix: '/api/v1/articles'});

interface Article {
    title: string,
    alltext: string
}

const getAll = async (ctx: RouterContext, next: any) => {
    let articles = await articlesmodel.getAll();
    if(articles.length){
        ctx.body = articles;
    } else {
        ctx.body = {}
    }
    await next();
}

const getById = async (ctx: RouterContext, next: any) => {
    let id = ctx.params.id;
    let article = await articlesmodel.getById(id);
    if(article.length){
        ctx.body = article[0];
    } else {
        ctx.status = 404;
    }
    await next();
}

const createArticle = async (ctx: RouterContext, next: any) => {
    const body = <Article> ctx.request.body;
    let result = await articlesmodel.add(body);
    if(result.status == 201){
        ctx.status = 201;
        ctx.body = body;
    } else {
        ctx.status = 500;
        ctx.body = { err: "Insert data failed"};
    }
    await next();
}

const updateArticle = async (ctx: RouterContext, next: any) => {
    try {
        console.log("Request Body:", ctx.request.body);
        const body = <Article>ctx.request.body;
        const id = parseInt(ctx.params.id);

        const result = await articlesmodel.update(id, body);

        switch (result.status) {
            case 201:
                ctx.status = 201;
                ctx.body = { description: 'Data updated successfully' };
                break;
            case 404:
                ctx.status = 404;
                ctx.body = { description: result.message };
                break;
            case 400:
                ctx.status = 400;
                ctx.body = { description: result.message };
                break;
            default:
                ctx.status = 500;
                ctx.body = { description: result.message };
                break;
        }
    } catch (err) {
        console.error("Error in updateArticle:", err);
        ctx.status = 500;
        ctx.body = { description: "Internal Server Error" };
    }
    await next();
}

const deleteArticle = async (ctx: RouterContext, next: any) => {
    await articlesmodel.deleteArticle(parseInt(ctx.params.id));
    ctx.status = 200;
    ctx.body = {status: 'operation successfully'}
    await next();
}

router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);
router.post('/', basicAuth, restrictCreate, bodyParser(), createArticle);
router.put('/:id([0-9]{1,})', basicAuth, restrictUpdate, bodyParser(), updateArticle);
router.delete('/:id([0-9]{1,})', basicAuth, restrictDelete, deleteArticle);

export { router };