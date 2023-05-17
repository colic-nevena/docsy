"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class PingRouter {
    constructor() {
        this.path = "/";
    }
    get router() {
        return (0, express_1.Router)()
            .get("/ping", (req, res) => res.json({ message: "OK" }));
    }
}
exports.default = PingRouter;
