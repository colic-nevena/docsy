import IHttpRequester, { RequestData } from "./httpRequester/IHttpRequester";

export class ApiError extends Error {
  constructor(message: string) {
    super(`[Api] Error - ${message}`);
  }
}

export default class Api {
  constructor(private readonly _baseUrl: string, private readonly _requester: IHttpRequester) {}

  async request<T>(
    url: string,
    method: RequestData["method"],
    data: RequestData["data"],
    useToken: boolean,
    headers: any = undefined
  ): Promise<T> {
    try {
      let fullPath = this._baseUrl;
      fullPath += url.startsWith("#") ? url.substring(1, url.length) : url;
      return await this._requester.request<T>({
        url: fullPath,
        method,
        data,
        headers,
        useToken,
      });
    } catch (error: any) {
      throw new ApiError(error.message);
    }
  }
}
