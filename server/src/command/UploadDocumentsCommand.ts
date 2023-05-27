import IDocumentRepository from "src/businessLogic/documents/persistance/repository/IDocumentRepository";
import Command from "./Command";
import Document from "src/businessLogic/documents/domain/Document";

export class UploadDocumentsError extends Error {
  constructor(message: string) {
    super(`[UploadDocuments] Error - ${message}`);
  }
}

export class UploadDocumentsRequest {
  constructor(public readonly files: Document[]) {}
}

export default class UploadDocuments implements Command {
  constructor(private request: UploadDocumentsRequest, private readonly documentRepository: IDocumentRepository) {}

  async execute(): Promise<any> {
    for (let file of this.request.files) {
      await this.documentRepository.saveDocument(file);
    }
  }
}
