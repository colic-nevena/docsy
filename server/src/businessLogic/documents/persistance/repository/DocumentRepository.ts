import crypto from "crypto";
import IDocumentTagMapGateway from "../gateway/IDocumentTagMapGateway";
import IDocumentRepository from "./IDocumentRepository";
import IDocumentGateway from "../gateway/IDocumentGateway";
import fs from "fs";

export class DocumentRepositoryError extends Error {
  constructor(message: string) {
    super(`[DocumentRepository] Error - ${message}`);
  }
}

export default class DocumentRepository implements IDocumentRepository {
  constructor(
    private readonly _documentGateway: IDocumentGateway,
    private readonly _documentTagMapGateway: IDocumentTagMapGateway
  ) {}

  async save(documentId: string, tagId: string): Promise<void> {
    try {
      await this._documentTagMapGateway.insert({ documentId, tagId, createdAt: new Date().toISOString() });
    } catch (e) {
      throw new DocumentRepositoryError(`[save] - ${(e as Error).message}`);
    }
  }

  async delete(documentId: string, documentName: string, documentPath: string): Promise<void> {
    try {
      await this._documentTagMapGateway.deleteByDocumentId(documentId);
      await this._documentGateway.delete(documentId);
    } catch (e) {
      throw new DocumentRepositoryError(`[delete] - ${(e as Error).message}`);
    }
  }
}
