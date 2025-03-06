"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictCreate = exports.restrictDelete = exports.restrictUpdate = void 0;
// To restrict updates to users with ID 1 and 2
const restrictUpdate = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield next();
});
exports.restrictUpdate = restrictUpdate;
// To restrict deletion to user with ID 3
const restrictDelete = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.state.user.id; // Get the authenticated user's ID
    if (userId !== 3) {
        ctx.status = 403; // Forbidden
        ctx.body = { message: "You are not allowed to delete articles." };
        return;
    }
    yield next();
});
exports.restrictDelete = restrictDelete;
// To restrict creation to user with ID 2
const restrictCreate = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.state.user.id; // Get the authenticated user's ID
    if (userId !== 2) {
        ctx.status = 403; // Forbidden
        ctx.body = { message: "You are not allowed to create articles." };
        return;
    }
    yield next();
});
exports.restrictCreate = restrictCreate;
