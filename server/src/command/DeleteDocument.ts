import IDocumentRepository from "src/businessLogic/documents/persistance/repository/IDocumentRepository";
import Command from "./Command";

export class DeleteDocumentError extends Error {
  constructor(message: string) {
    super(`[DeleteDocument] Error - ${message}`);
  }
}

export class DeleteDocumentRequest {
  constructor(
    public readonly documentId: string,
    public readonly documentName: string,
    public readonly documentPath: string
  ) {}
}

export default class DeleteDocument implements Command {
  constructor(private request: DeleteDocumentRequest, private readonly documentRepository: IDocumentRepository) {}

  async execute(): Promise<any> {
    await this.documentRepository.delete(this.request.documentId, this.request.documentName, this.request.documentPath);
  }
}
