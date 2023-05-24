import { Request, Response } from "express";
import IDocumentQueryService from "src/businessLogic/documents/persistance/queryService/IDocumentQueryService";
import { ICommandFactory } from "src/environment/command/ICommandFactory";
import jwt_decode from "jwt-decode";
export default class DocumentsController {
  constructor(
    private readonly commandFactory: ICommandFactory,
    private readonly documentQueryService: IDocumentQueryService
  ) {}

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
}
