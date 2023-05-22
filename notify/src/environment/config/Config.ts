import BaseConfig from "./BasicConfig";

export interface HttpServerConfig {
  port: number;
  webRoot: string;
}

export interface OneSignalConfig {
  appId: string;
  apiKey: string;
}

export interface ConfigData {
  nodeEnv: string;
  httpServer: HttpServerConfig;
  oneSignal: OneSignalConfig;
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
      httpServer: {
        port: this.convertToNumber("HTTP_PORT", env.HTTP_PORT),
        webRoot: this.convertToString("WEB_ROOT", env.WEB_ROOT),
      },
      oneSignal: {
        appId: this.convertToString("ONE_SIGNAL_APP_ID", env.ONE_SIGNAL_APP_ID),
        apiKey: this.convertToString("ONE_SIGNAL_API_KEY", env.ONE_SIGNAL_API_KEY),
      },
    };
  }
}
