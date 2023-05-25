import Api, { ApiRouter } from "./api/Api";
import AuthController from "./api/controllers/AuthController";
import AuthRouter from "./api/routers/AuthRouter";
import PingRouter from "./api/routers/PingRouter";
import DocumentTagMapGateway from "./businessLogic/documents/persistance/gateway/DocumentTagMapGateway";
import CommandFactory from "./environment/command/CommandFactory";
import Config, { ConfigData } from "./environment/config/Config";
import HttpApi from "./environment/httpServer/HttpApi";
import KnexConnector from "./knex/KnexConnector";
import AuthService from "./service/AuthService";
import NotifyService from "./service/NotifyService";
import DocumentRepository from "./businessLogic/documents/persistance/repository/DocumentRepository";
import TagGateway from "./businessLogic/tags/persistance/gateway/TagGateway";
import TagRepository from "./businessLogic/tags/persistance/repository/TagRepository";
import DocumentQueryService from "./businessLogic/documents/persistance/queryService/DocumentQueryService";
import DocumentsRouter from "./api/routers/DocumentsRouter";
import DocumentsController from "./api/controllers/DocumentsController";
import DocumentGateway from "./businessLogic/documents/persistance/gateway/DocumentGateway";

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
    const notify = new NotifyService(this.config.notify);

    const knex = new KnexConnector().knex;

    const documentGateway = new DocumentGateway(knex);
    const documentTagMapGateway = new DocumentTagMapGateway(knex);
    const documentRepository = new DocumentRepository(documentGateway, documentTagMapGateway);
    const documentQueryService = new DocumentQueryService(knex);

    const tagGateway = new TagGateway(knex);
    const tagRepository = new TagRepository(tagGateway);

    const commandFactory = new CommandFactory(notify, documentRepository, tagRepository);

    const routers: ApiRouter[] = [
      new PingRouter(),
      new AuthRouter(new AuthController(new AuthService(this.config.auth))),
      new DocumentsRouter(new DocumentsController(commandFactory, documentQueryService)),
    ];
    this.httpApi = new HttpApi(new Api(routers));
  }
}
