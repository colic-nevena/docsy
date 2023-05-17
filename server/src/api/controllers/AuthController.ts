import { Request, Response } from "express";
import AuthService from "src/service/AuthService";

export default class AuthController {

    constructor(private readonly _service: AuthService) { }

    async login(req: Request, res: Response): Promise<void> {
        let data: any
        if (req.body.grant_type === "password")
            data = await this._service.startSession(req.body.username, req.body.password)
        else if (req.body.grant_type === "refresh_token")
            data = await this._service.refreshSession(req.body.refresh_token)
        else
            throw new Error(`Login method is unsupported. Provided type: ${req.body.grant_type}`)
        res.json(data)
    }
    
    async logout(req: Request, res: Response): Promise<void> {
        const accessToken = req.headers.authorization?.split(" ")[1];
        if (accessToken === undefined) {
            res.status(403).send("Access denied")
            return;
        }
        await this._service.endSession(accessToken, req.body.refresh_token)
        res.status(204).send();
    }
}