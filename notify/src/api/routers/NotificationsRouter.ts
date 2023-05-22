import { Router } from "express";
import asyncHandler from "express-async-handler";
import { ApiRouter } from "../Api";
import NotificationsController from "../controllers/NotificationsController";

export default class NotificationsRouter implements ApiRouter {
  public readonly path = "/notifications";

  constructor(private readonly controller: NotificationsController) {}

  get router(): Router {
    return Router().post(
      "/",
      asyncHandler(async (req, res) => this.controller.sendNotification(req, res))
    );
  }
}
