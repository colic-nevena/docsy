import axios from "axios";
import IHttpRequester, { HttpError, RequestData } from "./IHttpRequester";
import LockObject from "./LockObject";
import TokenManager from "../TokenManager";

export class HttpRequesterError extends Error {
  constructor(message: string) {
    super(`[HttpRequester] Error - ${message}`);
  }
}

export default class HttpRequester implements IHttpRequester {
  private readonly _instance;
  private readonly _locker: LockObject = new LockObject();

  constructor(private readonly _baseUrl: string, private readonly _tokenManager: TokenManager) {
    this._instance = axios.create();
    this._instance.interceptors.request.use(
      (config) => this.configureRequest(config),
      (error) => Promise.reject(error)
    );
    this._instance.interceptors.response.use(
      (response) => response,
      (err) => this.handleResponseError(err)
    );
  }

  async request<T>(req: RequestData): Promise<T> {
    try {
      const result = await (req.useToken ? this._instance.request<T>(req) : axios.request<T>(req));
      return result.data;
    } catch (error: any) {
      const { config, status, statusText, data } = error.response;
      throw new HttpError(config.url, status, statusText, data);
    }
  }

  private configureRequest(config: any) {
    if (!this._tokenManager.hasToken()) throw new Error("Token is undefined");
    const token = this._tokenManager.token().access_token;
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    return config;
  }

  private async handleResponseError(input: any) {
    const status = input.response.status;
    if (this.isUnAuthorized(status)) {
      if (!(await this._locker.lock())) console.log("Refreshing...");
      this._tokenManager.storeToken(await this.newToken());
      this._locker.unlock();
      return this._instance.request(input.config);
    }
    return Promise.reject(input);
  }

  private isUnAuthorized(status: number): boolean {
    return status === 403 || status === 401;
  }

  private async newToken(): Promise<any> {
    try {
      const res = await axios.request({
        url: `${this._baseUrl}/auth/login`,
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: new URLSearchParams({
          refresh_token: this._tokenManager.token().refresh_token,
          client_id: "web",
          grant_type: "refresh_token"
        }).toString()
      });

      if (res.status !== 200)
        throw new Error(`[login] - Login error response status: ${res.status}, Message: ${res.statusText}`);
      console.log("New token...");
      return res.data;
    } catch (error: any) {
      this._tokenManager.deleteToken();
      throw error;
    }
  }
}
