import BaseConfig from "./BasicConfig";

export interface DBConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  databaseName: string;
}

export interface HttpServerConfig {
  port: number;
  webRoot: string;
}

export interface NotifyConfig {
  url: string;
}

export interface ServerAuthConfig {
  realm: string;
  server: string;
  client: string;
  secret: string;
  tokenEndpoint: string;
  endSessionEndpoint: string;
}

export interface ConfigData {
  nodeEnv: string;
  db: DBConfig;
  httpServer: HttpServerConfig;
  auth: ServerAuthConfig;
  notify: NotifyConfig;
}

export default class Config extends BaseConfig {
  public readonly config: ConfigData;

  constructor(env: any) {
    super();
    this.config = this.parseConfig(env);
  }

  protected parseConfig(env: any): ConfigData {
    return {
      nodeEnv: this.convertToString("NODE_ENV", env.NODE_ENV),
      db: {
        host: this.convertToString("DB_HOST", env.DB_HOST),
        port: this.convertToNumber("DB_PORT", env.DB_PORT),
        user: this.convertToString("DB_USER", env.DB_USER),
        password: this.convertToString("DB_PASSWORD", env.DB_PASSWORD),
        databaseName: this.convertToString("DB_NAME", env.DB_NAME),
      },
      httpServer: {
        port: this.convertToNumber("HTTP_PORT", env.HTTP_PORT),
        webRoot: this.convertToString("WEB_ROOT", env.WEB_ROOT),
      },
      auth: {
        realm: this.convertToString("AUTH_REALM", env.AUTH_REALM),
        server: this.convertToString("AUTH_SERVER", env.AUTH_SERVER),
        client: this.convertToString("AUTH_CLIENT", env.AUTH_CLIENT),
        secret: this.convertToString("AUTH_SECRET", env.AUTH_SECRET),
        tokenEndpoint: this.convertToString("TOKEN_ENDPOINT", env.TOKEN_ENDPOINT),
        endSessionEndpoint: this.convertToString("END_SESSION_ENDPOINT", env.END_SESSION_ENDPOINT),
      },
      notify: {
        url: this.convertToString("NOTIFY_URL", env.NOTIFY_URL),
      },
    };
  }
}
