import { Validator, ValidationError } from 'jsonschema';
import { RouterContext } from 'koa-router';
import { article } from '../schemas/article.schema';
const v = new Validator()

export const validateArticle = async (ctx: RouterContext, next: any) => {
    const validationOptions = {
        throwError: true,
        allowUnknownAttributes: false //not define attribute cannot pass
    }
    const body = ctx.request.body; //read the article body and checking
    try {
        v.validate(body, article, validationOptions)
        await next()
    } catch (error) {
        if (error instanceof ValidationError) {
            ctx.body = error;
            ctx.status = 400;
        } else {
            throw error;
        }
    }
}
   