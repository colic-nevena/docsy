import TableDataGateway from "src/environment/TableDataGateway";
import IDocumentTagMapGateway, { DocumentTagMapTableData } from "./IDocumentTagMapGateway";
import { Knex } from "knex";

export class DocumentTagMapGatewayError extends Error {
  constructor(message: string) {
    super(`[DocumentTagMapGateway] Error - ${message}`);
  }
}
export default class DocumentTagMapGateway extends TableDataGateway implements IDocumentTagMapGateway {
  private readonly table = "document_tag_map";

  constructor(private readonly _knex: Knex<any, unknown[]>) {
    super();
  }

  async insert(data: DocumentTagMapTableData): Promise<void> {
    try {
      await this._knex.table(this.table).insert(this.toInsertObject(data));
    } catch (error) {
      throw new DocumentTagMapGatewayError(`[insert] - ${(error as Error).message}`);
    }
  }

  async deleteByDocumentId(documentId: number): Promise<void> {
    try {
      await this._knex.table(this.table).where({ documentId }).del();
    } catch (error) {
      throw new DocumentTagMapGatewayError(`[deleteByDocumentId] - ${(error as Error).message}`);
    }
  }
}
