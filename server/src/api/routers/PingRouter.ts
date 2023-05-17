import { Router } from "express";
import { ApiRouter } from "../Api";

export default class PingRouter implements ApiRouter {
    public readonly path = "/"
    
    get router(): Router {
        return Router()
            .get("/ping", (req, res) => res.json({ message: "OK" }))
    }
}