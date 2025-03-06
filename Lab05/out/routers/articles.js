"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const articlesmodel = __importStar(require("../models/articles"));
const auth_1 = require("../controllers/auth");
const permissions_1 = require("../controllers/permissions");
const router = new koa_router_1.default({ prefix: '/api/v1/articles' });
exports.router = router;
const getAll = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    let articles = yield articlesmodel.getAll();
    if (articles.length) {
        ctx.body = articles;
    }
    else {
        ctx.body = {};
    }
    yield next();
});
const getById = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = ctx.params.id;
    let article = yield articlesmodel.getById(id);
    if (article.length) {
        ctx.body = article[0];
    }
    else {
        ctx.status = 404;
    }
    yield next();
});
const createArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = ctx.request.body;
    let result = yield articlesmodel.add(body);
    if (result.status == 201) {
        ctx.status = 201;
        ctx.body = body;
    }
    else {
        ctx.status = 500;
        ctx.body = { err: "Insert data failed" };
    }
    yield next();
});
const updateArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request Body:", ctx.request.body);
        const body = ctx.request.body;
        const id = parseInt(ctx.params.id);
        const result = yield articlesmodel.update(id, body);
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
    }
    catch (err) {
        console.error("Error in updateArticle:", err);
        ctx.status = 500;
        ctx.body = { description: "Internal Server Error" };
    }
    yield next();
});
const deleteArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield articlesmodel.deleteArticle(parseInt(ctx.params.id));
    ctx.status = 200;
    ctx.body = { status: 'operation successfully' };
    yield next();
});
router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);
router.post('/', auth_1.basicAuth, permissions_1.restrictCreate, (0, koa_bodyparser_1.default)(), createArticle);
router.put('/:id([0-9]{1,})', permissions_1.restrictUpdate, auth_1.basicAuth, (0, koa_bodyparser_1.default)(), updateArticle);
router.delete('/:id([0-9]{1,})', auth_1.basicAuth, permissions_1.restrictDelete, deleteArticle);
