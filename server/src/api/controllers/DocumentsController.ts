import { Request, Response } from "express";
import { ICommandFactory } from "src/environment/command/ICommandFactory";

export default class DocumentsController {
  constructor(private readonly commandFactory: ICommandFactory) {}

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
}
