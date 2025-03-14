import Router, { RouterContext } from "koa-router"; 
import { basicAuth } from '../controllers/auth' 

const router = new Router({prefix: '/api/v1'});

// Just for testing 
/***router.get('/', async(ctx: RouterContext, next: any) => { 
    ctx.body= { 
        message: 'Public API return' 
    }; 
    await next(); 
})***/

router.get('/', async (ctx: RouterContext) => { 
    ctx.body = { 
        message: 'Public API return' 
    }; 
});
// Add a protected route that requires authentication 
//router.get("/private", basicAuth); 
router.get("/private", basicAuth, async (ctx: RouterContext) => {
    ctx.body = {
        message: 'This is a private route, accessible only with valid credentials.'
    };
});

export {router};