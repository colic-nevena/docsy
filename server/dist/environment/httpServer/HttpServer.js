"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
class HttpServer {
    constructor() {
        this.skippedRoutes = ["", "/ping"];
        this.tag = "HTTP API";
    }
    start(port) {
        const app = (0, express_1.default)();
        this.addLogger(app);
        this.applyMiddleware(app);
        this.createRoutes(app);
        app.use((err, req, res, next) => {
            const { errorCode, message, status } = this.handleError(err);
            res.status(status).json({ message, errorCode });
        });
        app.listen(port, () => console.log(`[${this.tag}] Port: ${port}. Listening...`));
    }
    addLogger(app) {
        app.use((0, morgan_1.default)((tokens, req, res) => {
            return [
                `[${req.headers['user-agent'] ? req.headers['user-agent'] : "unknown"}]`,
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                tokens.res(req, res, 'content-length'), '-',
                tokens['response-time'](req, res), 'ms',
            ].join(' ');
        }, {
            skip: (req, res) => {
                if (this.skippedRoutes.find(route => route === req.url))
                    return true;
                return false;
            }
        }));
    }
    handleError(error) {
        console.log(error);
        return {
            message: "Internal server error",
            errorCode: "SERVER_ERROR",
            status: 500
        };
    }
    errorMessageContains(error, messages) {
        const message = error.message;
        return messages.map(m => message.indexOf(m) !== -1).reduce((p, c) => p && c, true);
    }
    errorResponse(message, errorCode, status) {
        return { message, errorCode, status };
    }
}
exports.default = HttpServer;
