import { Router } from "express";
import asyncHandler from "express-async-handler";
import { ApiRouter } from "../Api";
import DocumentsController from "../controllers/DocumentsController";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "src/assets/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
export default class DocumentsRouter implements ApiRouter {
  public readonly path = "/documents";

  constructor(private readonly controller: DocumentsController) {}

  get router(): Router {
    return Router()
      .post(
        "/",
        asyncHandler(async (req, res) => this.controller.downloadDocument(req, res))
      )
      .post(
        "/upload",
        upload.array("files"),
        asyncHandler(async (req, res) => this.controller.uploadDocuments(req, res))
      )
      .post(
        "/:id/share",
        asyncHandler(async (req, res) => this.controller.shareDocument(req, res))
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
