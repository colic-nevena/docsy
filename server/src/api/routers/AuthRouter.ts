import { Router } from "express";
import asyncHandler from 'express-async-handler';
import AuthController from "../controllers/AuthController";
import { ApiRouter } from "../Api";

export default class AuthRouter implements ApiRouter {
    public readonly path = "/auth"

    constructor(private readonly controller: AuthController) {}
    
    get router(): Router {
        return Router()
        .post('/login', asyncHandler(async (req, res) => this.controller.login(req, res)))
        .post('/logout', asyncHandler(async (req, res) => this.controller.logout(req, res)))
    }
}