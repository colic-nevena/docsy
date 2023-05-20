import NotificationsController from "api/controllers/NotificationsController";
import NotificationsRouter from "../api/routers/NotificationsRouter";
import Api, { ApiRouter } from "api/Api";
import HttpApi from "../environment/httpServer/HttpApi";
import Config, { ConfigData } from "../environment/config/Config";
import { Client } from "onesignal-node";

export default class DependencyContainer {
  private readonly config: ConfigData;
  private httpApi!: HttpApi;

  constructor(env: any) {
    this.config = new Config(env).config;
    this.createDependency();
  }

  async start() {
    this.httpApi.start(this.config.httpServer.port);
  }

  private createDependency() {
    const oneSignalClient = new Client(
      process.env.ONE_SIGNAL_APP_ID as string,
      process.env.ONE_SIGNAL_API_KEY as string
    );

    const routers: ApiRouter[] = [new NotificationsRouter(new NotificationsController(oneSignalClient))];
    this.httpApi = new HttpApi(new Api(routers));
  }
}
