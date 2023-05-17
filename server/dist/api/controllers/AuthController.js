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
class AuthController {
    constructor(_service) {
        this._service = _service;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            if (req.body.grant_type === "password")
                data = yield this._service.startSession(req.body.username, req.body.password);
            else if (req.body.grant_type === "refresh_token")
                data = yield this._service.refreshSession(req.body.refresh_token);
            else
                throw new Error(`Login method is unsupported. Provided type: ${req.body.grant_type}`);
            res.json(data);
        });
    }
    logout(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (accessToken === undefined) {
                res.status(403).send("Access denied");
                return;
            }
            yield this._service.endSession(accessToken, req.body.refresh_token);
            res.status(204).send();
        });
    }
}
exports.default = AuthController;
