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
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
class AuthRouter {
    constructor(controller) {
        this.controller = controller;
        this.path = "/auth";
    }
    get router() {
        return (0, express_1.Router)()
            .post('/login', (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () { return this.controller.login(req, res); })))
            .post('/logout', (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () { return this.controller.logout(req, res); })));
    }
}
exports.default = AuthRouter;
