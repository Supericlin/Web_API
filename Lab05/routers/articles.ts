import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";

const router = new Router({prefix: '/api/v1/articles'});

const articles = [
    {title:'hello article', fullText:'some text here to fill the body'},
    {title:'another article', fullText:'again here is some text here to fill'},
    {title:'coventry university ', fullText:'some news about coventry university'},
    //{title:'smart campus', fullText:'smart campus is coming to IVE'}
];

/***interface RequestBody {
    title: string;
    fullText: string;
}***/

const getAll = async (ctx: RouterContext, next: any) => {
    ctx.body = articles;
    await next();
}

const getById = async (ctx: RouterContext, next: any) => {
    let id = +ctx.params.id
    if ((id < articles.length+1) && (id > 0)) {
        ctx.body = articles[id-1];
    } else {
        ctx.status = 404;
    }
    await next();
}

const createArticle = async (ctx: RouterContext, next: any) => {
    let article: any = ctx.request.body;
    let newArticle = {title: article.title, fullText: article.fullText};
    articles.push(newArticle);
    ctx.status = 201;
    ctx.body = newArticle;
    await next();
}
const updateArticle = async (ctx: RouterContext, next: any) => {
    let id = +ctx.params.id;

    // Validate the ID
    if (id <= 0 || id > articles.length) {
        ctx.status = 404; // Not Found
        ctx.body = { error: "Article not found." };
        return;
    }

    // Extract the updated data from the request body
    const { title, fullText } = ctx.request.body as { title: string; fullText: string };

    // Validate the input
    if (!title || !fullText) {
        ctx.status = 400; // Bad Request
        ctx.body = { error: "Both 'title' and 'fullText' are required." };
        return;
    }

    // Update the article in the array
    const article = articles[id - 1]; // Find the article by index
    article.title = title;
    article.fullText = fullText;

    // Respond with the updated article
    ctx.status = 200; // OK
    ctx.body = article;
    await next();
}
const deleteArticle = async (ctx: RouterContext, next: any) => {
    //TODO: delete an article
    await next();
}
router.get('/', getAll);
//router.get('/:id', getById);
router.post('/', bodyParser(), createArticle);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', updateArticle);
//router.del('/:id([0-9]{1,})', deleteArticle);

export { router };