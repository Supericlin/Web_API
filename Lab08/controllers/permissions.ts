import { RouterContext } from "koa-router";

// To restrict updates to users with ID 1 and 2
export const restrictUpdate = async (ctx: RouterContext, next: any) => {
    if (!ctx.state.user) {
        console.error("ctx.state.user is undefined"); // Debug log
        ctx.status = 500;
        ctx.body = { message: "Internal Server Error: Authenticated user not found" };
        return;
    }
    
    const userId = ctx.state.user.id; // Get the authenticated user's ID
    if (userId !== 2) {
        ctx.status = 403; // Forbidden
        ctx.body = { message: "You are not allowed to update articles." };
        return;
    }
    await next();
};

// To restrict deletion to user with ID 3
export const restrictDelete = async (ctx: RouterContext, next: any) => {
    const userId = ctx.state.user.id; // Get the authenticated user's ID
    if (userId !== 3) {
        ctx.status = 403; // Forbidden
        ctx.body = { message: "You are not allowed to delete articles." };
        return;
    }
    await next();
};

// To restrict creation to user with ID 2
export const restrictCreate = async (ctx: RouterContext, next: any) => {
    const userId = ctx.state.user.id; // Get the authenticated user's ID
    if (userId !== 2) {
        ctx.status = 403; // Forbidden
        ctx.body = { message: "You are not allowed to create articles." };
        return;
    }
    await next();
};