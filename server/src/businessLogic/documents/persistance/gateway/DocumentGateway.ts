import TableDataGateway from "src/environment/TableDataGateway";
import { Knex } from "knex";
import IDocumentGateway, { DocumentTableData } from "./IDocumentGateway";

export class DocumentGatewayError extends Error {
  constructor(message: string) {
    super(`[DocumentTagMapGateway] Error - ${message}`);
  }
}
export default class DocumentGateway extends TableDataGateway implements IDocumentGateway {
  private readonly table = "document";

  constructor(private readonly _knex: Knex<any, unknown[]>) {
    super();
  }

  async delete(documentId: string): Promise<void> {
    try {
      await this._knex.table(this.table).where({ id: documentId }).del();
    } catch (error) {
      throw new DocumentGatewayError(`[delete] - ${(error as Error).message}`);
    }
  }

  async insert(document: DocumentTableData): Promise<void> {
    try {
      await this._knex.table(this.table).insert(this.toInsertObject(document));
    } catch (error) {
      throw new DocumentGatewayError(`[insert] - ${(error as Error).message}`);
    }
  }
}
