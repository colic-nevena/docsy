import IHttpRequester from "../dependency/httpRequester/IHttpRequester";
import TokenManager from "../dependency/TokenManager";

export class AuthServiceError extends Error {
  constructor(message: string) {
    super(`[AuthService] Error - ${message}`);
  }
}

const wait = async (time: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

export default class AuthService {
  constructor(
    private readonly _baseUrl: string,
    private readonly _requester: IHttpRequester,
    private readonly _tokenManager: TokenManager
  ) {}

  async login(username: string, password: string): Promise<void> {
    try {
      await wait(2000);
      const token = await this._requester.request({
        method: "POST",
        url: `${this._baseUrl}/admin-app/auth/login`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: new URLSearchParams({
          username,
          password,
          grant_type: "password",
        }),
      });
      this._tokenManager.storeToken(token);
    } catch (error: any) {
      throw new AuthServiceError(`[login] - ${error.message}`);
    }
  }
  async logout(): Promise<void> {}
  async check(): Promise<void> {
    try {
      await this._requester.request({
        method: "GET",
        url: `${this._baseUrl}/admin-app/ping/protected`,
        useToken: true,
      });
    } catch (error: any) {
      throw new AuthServiceError(`[check] - ${error.message}`);
    }
  }
}
