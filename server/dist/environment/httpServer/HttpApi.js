"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const HttpServer_1 = __importDefault(require("./HttpServer"));
class HttpApi extends HttpServer_1.default {
    constructor(api) {
        super();
        this.api = api;
    }
    applyMiddleware(app) {
        app
            .set('trust proxy', true)
            .use((0, express_session_1.default)({
            secret: 'some secret',
            resave: false,
            saveUninitialized: true,
            store: new express_session_1.default.MemoryStore()
        }))
            .use(express_1.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }))
            .use(express_1.default.json());
    }
    createRoutes(app) {
        const routers = this.api.routers();
        for (const { path, router } of routers)
            app.use(path, router);
    }
    handleError(error) {
        return this.api.handleError(error);
    }
}
exports.default = HttpApi;
