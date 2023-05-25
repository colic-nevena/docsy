import { Knex } from "knex";
import IDocumentQueryService from "./IDocumentQueryService";
import { DocumentModel } from "./model/DocumentModel";

export class DocumentQueryServiceError extends Error {
  constructor(message: string) {
    super(`[DocumentQueryService] Error - ${message}`);
  }
}

export default class DocumentQueryService implements IDocumentQueryService {
  private readonly documentTable = "document";
  private readonly tagTable = "tag";
  private readonly mapTable = "document_tag_map";

  constructor(private readonly _knex: Knex<any, unknown[]>) {}

  async getOwnerDocuments(owner: string): Promise<DocumentModel[]> {
    try {
      const docs = await this._knex.table(this.documentTable).where({ owner });
      return docs.map((doc) => this.toDocumentModel(doc));
    } catch (e: any) {
      throw new DocumentQueryServiceError(`[getOwnerDocuments] - ${e.message}`);
    }
  }

  async getSegmentDocuments(segment: string): Promise<DocumentModel[]> {
    try {
      const segmentId = await this._knex.table(this.tagTable).where({ key: segment }).first();
      if (segmentId) {
        const segmentAllId = await this._knex.table(this.tagTable).where({ key: "all" }).first();

        const segmentDocumentsIds = await this._knex.table(this.mapTable).where({ tag_id: segmentId.id }).select();
        const segmentAllDocumentsIds = await this._knex
          .table(this.mapTable)
          .where({ tag_id: segmentAllId.id })
          .select();

        let resultDocuments = [];
        for (let doc of segmentDocumentsIds) {
          resultDocuments.push(await this._knex.table(this.documentTable).where({ id: doc.document_id }).first());
        }

        for (let doc of segmentAllDocumentsIds) {
          resultDocuments.push(await this._knex.table(this.documentTable).where({ id: doc.document_id }).first());
        }

        return resultDocuments.map((doc) => this.toDocumentModel(doc));
      } else return [];
    } catch (e: any) {
      throw new DocumentQueryServiceError(`[getSegmentDocuments] - ${e.message}`);
    }
  }

  private toDocumentModel(row: any): DocumentModel {
    return {
      id: row.id,
      name: row.name,
      path: row.path,
      size: row.size,
      owner: row.owner,
      type: row.type,
      createdAt: row.created_at,
    };
  }
}
