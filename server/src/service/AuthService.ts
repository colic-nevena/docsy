import axios from "axios";
import { ServerAuthConfig } from "src/environment/config/Config";

export class AuthServiceError extends Error {
  constructor(message: string) {
    super(`[AuthService] Error - ${message}`);
  }
}

export default class AuthService {
  constructor(private readonly _config: ServerAuthConfig) {}

  async startSession(username: string, password: string): Promise<any> {
    try {
      return await this.request(
        new URLSearchParams({
          client_id: this._config.client,
          grant_type: "password",
          client_secret: this._config.secret,
          username,
          password,
        })
      );
    } catch (error: any) {
      console.log(error)
      throw new AuthServiceError(`[login] - ${error.message}`);
    }
  }

  async refreshSession(refreshToken: string): Promise<any> {
    try {
      return await this.request(
        new URLSearchParams({
          client_id: this._config.client,
          grant_type: "refresh_token",
          client_secret: this._config.secret,
          refresh_token: refreshToken,
        })
      );
    } catch (error: any) {
      throw new AuthServiceError(`[refreshToken] - ${error.message}`);
    }
  }

  async endSession(accessToken: string, refreshToken: string): Promise<void> {
    const params = new URLSearchParams({
      client_id: this._config.client,
      client_secret: this._config.secret,
      refresh_token: refreshToken,
    });
    await axios.request({
      method: "POST",
      url: this._config.endSessionEndpoint,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: params.toString(),
    });
  }

  private async request(data: URLSearchParams): Promise<any> {
    const result = await axios.request({
      url: this._config.tokenEndpoint,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data.toString(),
    });
    return result.data;
  }
}
