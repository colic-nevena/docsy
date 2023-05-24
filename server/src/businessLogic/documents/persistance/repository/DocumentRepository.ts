import crypto from "crypto";
import IDocumentTagMapGateway from "../gateway/IDocumentTagMapGateway";
import IDocumentRepository from "./IDocumentRepository";

export class DocumentRepositoryError extends Error {
  constructor(message: string) {
    super(`[DocumentRepository] Error - ${message}`);
  }
}

export default class DocumentRepository implements IDocumentRepository {
  constructor(private readonly _documentTagMapGateway: IDocumentTagMapGateway) {}

  async save(documentId: string, tagId: string): Promise<void> {
    try {
      await this._documentTagMapGateway.insert({ documentId, tagId, createdAt: new Date().toISOString() });
    } catch (e) {
      throw new DocumentRepositoryError(`[save] - ${(e as Error).message}`);
    }
  }
}
