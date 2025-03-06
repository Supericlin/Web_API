import passport from "koa-passport"; 
import { BasicStrategy } from "passport-http"; 
import { RouterContext } from "koa-router"; 

import * as users  from '../models/users'; 

const verifyPassword = (user: any, password: string) => { 
    return user.password === password; 
} 

passport.use(new BasicStrategy(async (username, password, done) => { 
    let result: any[] = [];   
    try {     
        result = await users.findByUsername(username);   
    } catch (error: any) {     
        console.error(`Error during authentication for user ${username}: ${error}`);     
        done(null, false);   
    }   
    if(result.length) {     
        const user = result[0];     
        if(verifyPassword(user, password)) {       
            done(null, {user: user});     
        } else {       
            console.log(`Password incorrect for ${username}`);       
            done(null, false);     
        } 
    } else { 
        console.log(`No user found with username ${username}`); 
        done(null, false); 
    } 
}));

export const basicAuth = async (ctx: RouterContext, next: any) => { 
    await passport.authenticate("basic", { session: false })(ctx, next); 
    if(ctx.status == 401) 
    { 
        ctx.body = { 
            message: 'you are not authorized' 
        }; 
    } 
    /***else { 
        ctx.body = { 
            message: 'you are passed' 
        }; 
    }***/
};

/***export const basicAuth = async (ctx: RouterContext, next: any) => {
    await passport.authenticate("basic", { session: false }, (err, user, info) => {
        if (err || !user) {
            ctx.status = 401;
            ctx.body = { message: 'You are not authorized' };
            return;
        }
        ctx.state.user = user.user;
        //ctx.state.user = user.user; // Attach the authenticated user object to ctx.state
        console.log("Authenticated User:", ctx.state.user); // Log the user object
    })(ctx, next);
    
    //if (ctx.status !== 401) {
    if (ctx.state.user) {
        await next();
    }
};***/