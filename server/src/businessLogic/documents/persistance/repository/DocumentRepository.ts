import IDocumentTagMapGateway from "../gateway/IDocumentTagMapGateway";
import IDocumentRepository from "./IDocumentRepository";
import IDocumentGateway, { DocumentTableData } from "../gateway/IDocumentGateway";
import Document from "../../domain/Document";

export class DocumentRepositoryError extends Error {
  constructor(message: string) {
    super(`[DocumentRepository] Error - ${message}`);
  }
}

export default class DocumentRepository implements IDocumentRepository {
  constructor(private readonly _documentGateway: IDocumentGateway, private readonly _documentTagMapGateway: IDocumentTagMapGateway) {}

  async saveSharedRelationship(documentId: string, tagId: string): Promise<void> {
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

  async saveDocument(document: Document): Promise<void> {
    try {
      await this._documentGateway.insert(this.toTableData(document));
    } catch (e) {
      throw new DocumentRepositoryError(`[saveDocument] - ${(e as Error).message}`);
    }
  }

  private toTableData(document: Document): DocumentTableData {
    return {
      id: document.id,
      name: document.name,
      path: document.path,
      size: document.size,
      type: document.type,
      owner: document.owner,
    };
  }
}
