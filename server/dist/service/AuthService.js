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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServiceError = void 0;
const axios_1 = __importDefault(require("axios"));
const HttpRequesterError_1 = require("./error/HttpRequesterError");
class AuthServiceError extends Error {
    constructor(message) {
        super(`[AuthService] Error - ${message}`);
    }
}
exports.AuthServiceError = AuthServiceError;
class AuthService {
    constructor(_config) {
        this._config = _config;
    }
    startSession(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.request(new URLSearchParams({
                    client_id: this._config.client,
                    grant_type: "password",
                    client_secret: this._config.secret,
                    username,
                    password,
                }));
            }
            catch (error) {
                const { config, status, statusText, data } = error.response;
                const httpError = new HttpRequesterError_1.HttpError({
                    url: config.url,
                    status,
                    statusText,
                    data,
                });
                throw new AuthServiceError(`[login] - ${error.message}`);
            }
        });
    }
    refreshSession(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.request(new URLSearchParams({
                    client_id: this._config.client,
                    grant_type: "refresh_token",
                    client_secret: this._config.secret,
                    refresh_token: refreshToken,
                }));
            }
            catch (error) {
                throw new AuthServiceError(`[refreshToken] - ${error.message}`);
            }
        });
    }
    endSession(accessToken, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = new URLSearchParams({
                client_id: this._config.client,
                client_secret: this._config.secret,
                refresh_token: refreshToken,
            });
            yield axios_1.default.request({
                method: "POST",
                url: this._config.endSessionEndpoint,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: params.toString(),
            });
        });
    }
    request(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield axios_1.default.request({
                url: this._config.tokenEndpoint,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: data.toString(),
            });
            return result.data;
        });
    }
}
exports.default = AuthService;
