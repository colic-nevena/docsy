import Api, { ApiRouter } from "./api/Api"
import AuthController from "./api/controllers/AuthController"
import AuthRouter from "./api/routers/AuthRouter"
import PingRouter from "./api/routers/PingRouter"
import Config, { ConfigData } from "./environment/config/Config"
import HttpApi from "./environment/httpServer/HttpApi"
import AuthService from "./service/AuthService"

export default class DependencyContainer {
    private readonly config: ConfigData
    private httpApi!: HttpApi

    constructor(env: any) {
        this.config = new Config(env).config
        this.createDependency()
    }

    async start() {
        this.httpApi.start(this.config.httpServer.port)
    }

    private createDependency() {
        const routers: ApiRouter[] = [new PingRouter(), new AuthRouter(new AuthController(new AuthService(this.config.auth)))]
        this.httpApi = new HttpApi(new Api(routers))
    }
}