import NotificationsController from "api/controllers/NotificationsController";
import NotificationsRouter from "../api/routers/NotificationsRouter";
import Api, { ApiRouter } from "api/Api";
import HttpApi from "../environment/httpServer/HttpApi";
import Config, { ConfigData } from "../environment/config/Config";
import { Client } from "onesignal-node";
import OneSignal from "service/OneSignal";
import SendNotification, { SendNotificationRequest } from "./command/SendNotification";

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
    const oneSignalClient = new Client(this.config.oneSignal.appId, this.config.oneSignal.apiKey);

    const routers: ApiRouter[] = [new NotificationsRouter(new NotificationsController(new OneSignal(oneSignalClient)))];
    this.httpApi = new HttpApi(new Api(routers));
  }
}
