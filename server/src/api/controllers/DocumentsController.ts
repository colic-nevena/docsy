import { Request, Response } from "express";
import IDocumentQueryService from "src/businessLogic/documents/persistance/queryService/IDocumentQueryService";
import { ICommandFactory } from "src/environment/command/ICommandFactory";
import jwt_decode from "jwt-decode";
import fs from "fs";
import DocumentFactory from "src/businessLogic/documents/domain/DocumentFactory";
import Document from "src/businessLogic/documents/domain/Document";
export default class DocumentsController {
  constructor(private readonly commandFactory: ICommandFactory, private readonly documentQueryService: IDocumentQueryService) {}

  async shareDocument(req: Request, res: Response): Promise<void> {
    try {
      const { segments } = req.body;
      const documentId = req.params.id;

      if (documentId === undefined || segments.length === 0) {
        throw new Error("Parameters cannot be undefined.");
      }

      const command = this.commandFactory.getShareDocumentCommand(documentId, segments);
      await command.execute();

      res.status(200).json();
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async getDocuments(req: Request, res: Response): Promise<void> {
    try {
      const { segment } = req.query;

      if (segment) {
        res.status(200).json(await this.documentQueryService.getSegmentDocuments(segment as string));
      } else {
        const accessToken = req.headers.authorization?.split(" ")[1];
        const { email } = jwt_decode(accessToken as string) as any;
        res.status(200).json(await this.documentQueryService.getOwnerDocuments(email));
      }
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async downloadDocument(req: Request, res: Response): Promise<void> {
    try {
      const { documentName, documentPath } = req.body;

      if (!documentName || !documentPath) {
        throw new Error("Parameters cannot be undefined.");
      }

      const path = __dirname.split("/src");
      res.download(`${path[0]}/${documentPath}/${documentName}`, documentName);
    } catch (e) {
      console.log(e);
      res.status(500).send("There was a problem downloading the file. Please try again later.");
    }
  }

  async deleteDocument(req: Request, res: Response): Promise<void> {
    try {
      const documentId = req.params.id;
      const { documentName, documentPath } = req.body;

      if (!documentId || !documentName || !documentPath) {
        throw new Error("Parameters cannot be undefined.");
      }

      const command = this.commandFactory.getDeleteDocumentCommand(documentId, documentName, documentPath);
      await command.execute();

      res.status(200).json();
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async uploadDocuments(req: Request, res: Response): Promise<void> {
    try {
      if (!req.files || req.files?.length === 0) {
        throw new Error("No files to upload.");
      }

      const accessToken = req.headers.authorization?.split(" ")[1];
      const { email } = jwt_decode(accessToken as string) as any;

      const files: Document[] = [];
      if (req.files) {
        Object.values(req.files).forEach((file) => files.push(DocumentFactory.createDocument(file, email)));
      }

      const command = this.commandFactory.getUploadDocumentsCommand(files);
      await command.execute();

      res.status(200).json();
    } catch (e) {
      res.status(500).send(e);
    }
  }
}
