"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasicConfig_1 = __importDefault(require("./BasicConfig"));
class Config extends BasicConfig_1.default {
    constructor(env) {
        super();
        this.config = this.parseConfig(env);
    }
    parseConfig(env) {
        return {
            nodeEnv: this.convertToString("NODE_ENV", env.NODE_ENV),
            db: {
                host: this.convertToString("DB_HOST", env.DB_HOST),
                port: this.convertToNumber("DB_PORT", env.DB_PORT),
                user: this.convertToString("DB_USER", env.DB_USER),
                password: this.convertToString("DB_PASSWORD", env.DB_PASSWORD),
                databaseName: this.convertToString("DB_NAME", env.DB_NAME),
            },
            httpServer: {
                port: this.convertToNumber("HTTP_PORT", env.HTTP_PORT),
                webRoot: this.convertToString("WEB_ROOT", env.WEB_ROOT)
            },
            auth: {
                realm: this.convertToString("AUTH_REALM", env.AUTH_REALM),
                server: this.convertToString("AUTH_SERVER", env.AUTH_SERVER),
                client: this.convertToString("AUTH_CLIENT", env.AUTH_CLIENT),
                secret: this.convertToString("AUTH_SECRET", env.AUTH_SECRET),
                tokenEndpoint: this.convertToString("TOKEN_ENDPOINT", env.TOKEN_ENDPOINT),
                endSessionEndpoint: this.convertToString("END_SESSION_ENDPOINT", env.END_SESSION_ENDPOINT)
            }
        };
    }
}
exports.default = Config;
