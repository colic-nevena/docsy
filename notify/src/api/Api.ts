import { Router } from "express";
import { ErrorResponse } from "../environment/httpServer/HttpServer";

export class BadApiParameters extends Error {
  constructor() {
    super("Bad api parameters");
  }
}

export interface ApiRouter {
  path: string;
  router: Router;
}

export default class Api {
  constructor(private readonly apiRouters: ApiRouter[]) {}

  routers(): ApiRouter[] {
    return this.apiRouters;
  }

  handleError(error: Error): ErrorResponse {
    console.log(error);
    return this.errorResponse("Internal server error", "SERVER_ERROR", 500);
  }

  private errorResponse(message: string, errorCode: string, status: number) {
    return { message, errorCode, status };
  }
}
