import { Router } from "express";
import asyncHandler from "express-async-handler";
import { ApiRouter } from "../Api";
import DocumentsController from "../controllers/DocumentsController";

export default class DocumentsRouter implements ApiRouter {
  public readonly path = "/documents";

  constructor(private readonly controller: DocumentsController) {}

  get router(): Router {
    return Router()
      .post(
        "/:id/share",
        asyncHandler(async (req, res) => this.controller.shareDocument(req, res))
      )
      .post(
        "/",
        asyncHandler(async (req, res) => this.controller.downloadDocument(req, res))
      )
      .post(
        "/:id",
        asyncHandler(async (req, res) => this.controller.deleteDocument(req, res))
      )

      .get(
        "/",
        asyncHandler(async (req, res) => this.controller.getDocuments(req, res))
      );
  }
}